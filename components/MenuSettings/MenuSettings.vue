<!-- eslint-disable array-callback-return -->
<!-- eslint-disable no-console -->
<template>
  <div class="demo-collapse m-10">
    <h2 class="mb-4">Menu settings</h2>
    <el-button type="success" style="margin-bottom: 10px" @click="handleClick"
      >Save</el-button
    >
    <div>
      <div>
        <input
          type="checkbox"
          :checked="menuObject.checkedStatus"
          @change="updateCheckedStatus(menuObject)"
        />
        {{ menuObject.name }}
      </div>
      <draggable
        v-if="activeMenuList.length"
        v-model="activeMenuList"
        class="columns-box w-[200px]"
        group="items"
        :tag="dragType"
        @end="handleDragEnd"
      >
        <div
          v-for="(item, index) in activeMenuList"
          :key="item.id"
          class="drag-me"
        >
          <div
            class="flex items-center gap-2 justify-between cursor-pointer p-[5px]"
            @contextmenu="handleContextMenu(item, $event, index, 'parent')"
          >
            <div class="flex gap-2 items-center">
              <input
                :id="item.id"
                type="checkbox"
                :checked="item.checkedStatus"
                @change="updateCheckedStatus(item)"
              />
              <label :for="item.id">{{ item.name }}</label>
            </div>
            <img
              :class="{ 'rotate-0': item.isOpen }"
              src="../../assets/icons/arrow.png"
              alt="arrow"
              class="w-[12px] -rotate-90"
              @click="toggleList(item)"
            />
          </div>
          <ul
            v-if="item.isOpen"
            class="w-[200%] ml-[20px]"
            style="transition: max-height"
          >
            <draggable
              v-model="item.children"
              class="columns-box cursor-pointer"
              group="items"
              @end="handleDragEnd"
            >
              <li
                v-for="(value, index2) in item.children"
                :key="index2"
                class="flex gap-2 cursor-pointer"
                @contextmenu="
                  handleContextMenu(value, $event, index2, 'children', index)
                "
              >
                <input
                  :id="value.id"
                  type="checkbox"
                  class="cursor-pointer"
                  :checked="value.checkedStatus"
                  @change="updateChildCheckedStatus(item, index2)"
                />
                <label class="cursor-pointer" :for="value.id">{{
                  value.name
                }}</label>
              </li>
            </draggable>
          </ul>
        </div>
      </draggable>
      <div v-else>No data</div>
    </div>

    <!-- Модальное окно -->
    <div v-if="showModal" ref="modalRef" class="modal">
      <div class="modal-content flex flex-col gap-2" @click.stop="">
        <h2>Модальное окно</h2>
        <div
          v-for="(action, index) in actions"
          :key="index"
          class="flex gap-2 items-center"
        >
          <input
            :id="action.name"
            :checked="action.status"
            type="checkbox"
            @change="changeActionStatus(action.name, index)"
          />
          <label :for="action.name">{{ action.name }}</label>
        </div>
        <ul class="flex gap-2 items-center">
          <li class="flex gap-2 items-center">
            <GenericButton
              name="fullAccess"
              pl="10"
              pt="5"
              pr="10"
              pb="5"
              bggradient="linear-gradient(to right, rgba(70,94,140,0.8),rgb(34,39,76))"
              textsize="14"
              @click="changeAccess('full')"
            />
          </li>
          <li class="flex gap-2 items-center">
            <GenericButton
              name="Don'tAccess"
              pl="10"
              pt="5"
              pr="10"
              pb="5"
              bggradient="linear-gradient(to right, rgba(70,94,140,0.8),rgb(34,39,76))"
              textsize="14"
              @click="changeAccess('null')"
            />
          </li>
        </ul>
        <div class="flex items-center justify-center mt-2">
          <GenericButton
            name="Закрыть"
            pl="10"
            pt="5"
            pr="10"
            pb="5"
            bggradient="linear-gradient(90deg, rgba(162,75,75,1) 0%, rgba(121,9,9,1) 53%,
rgba(154,81,81,1) 100%)"
            textsize="14"
            @click="closeModal()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Draggable from 'vuedraggable'
import GenericButton from '../Button/GenericButton.vue'

export default {
  components: {
    Draggable,
    GenericButton,
  },

  props: ['activemenu', 'menuobj'],
  data() {
    return {
      menuObject: {},
      activeMenuList: [],
      dragType: 'div',
      showModal: false,
      modalInput: '',
      actions: [],
      parentItem: {},
      allAccess: null,
    }
  },
  mounted() {
    this.activeMenuList = this.activemenu
    this.menuObject = this.menuobj
  },
  beforeDestroy() {
    // Удаление обработчика события click перед удалением компонента
    window.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    toggleList(item) {
      // Закрытие предыдущего открытого элемента, если есть
      this.activeMenuList.forEach((menu) => {
        if (menu !== item) {
          menu.isOpen = false
        }
      })

      // Открытие или закрытие текущего элемента
      item.isOpen = !item.isOpen
    },
    updateCheckedStatus(item) {
      item.checkedStatus = !item.checkedStatus
      if (item.children) {
        // eslint-disable-next-line array-callback-return
        item.children.map((children, index) => {
          children.checkedStatus = !children.checkedStatus
        })
      }
    },
    updateChildCheckedStatus(item, index) {
      item.children[index].checkedStatus = !item.children[index].checkedStatus
    },
    handleDragEnd() {
      // Обновление порядка элементов и их свойства order
      this.activeMenuList.forEach((item, index) => {
        item.order = index + 1
      })
    },
    handleClick() {
      const menuObj = {
        ...this.menuObject,
        children: this.activeMenuList,
      }
      const data = {
        id: 1,
        jsonTree: menuObj,
      }

      axios
        .post(`https://192.168.1.55:8443/api/user/editUserPerm`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          location.reload()
        })
        .catch(() => {})
    },
    handleContextMenu(item, event, index, type, parentIndex) {
      event.preventDefault()
      this.showModal = true
      if (item.actions === null) {
        this.actions = item.children[0].actions
        this.parentItem = { item, index, type, parentIndex }
      } else {
        this.actions = item.actions
        this.parentItem = { item, index, type, parentIndex }
      }
    },
    closeModal() {
      this.showModal = false
    },
    handleClickOutside(event) {
      // Проверка, был ли клик за пределами модального окна или на другом элементе меню
      if (
        this.$refs.modalRef &&
        !this.$refs.modalRef.contains(event.target) &&
        !event.target.classList.contains('drag-me')
      ) {
        this.closeModal()
      }
    },

    changeActionStatus(name, index, parentType) {
      if (this.parentItem.type === 'children') {
        if (parentType) {
          if (parentType === 'full') {
            this.actions[index].status = true
          } else if (parentType === 'null') {
            this.actions[index].status = false
          }
        } else {
          this.actions[index].status = !this.actions[index].status
        }

        const selectedActions = this.actions
        this.activeMenuList[this.parentItem.parentIndex].children[
          this.parentItem.index
        ].actions = selectedActions
      } else if (this.parentItem.type === 'parent') {
        this.activeMenuList[this.parentItem.index].children.map((item) => {
          // eslint-disable-next-line array-callback-return
          return item.actions.map((access) => {
            if (access.name === name) {
              if (parentType) {
                if (parentType === 'full') {
                  access.status = true
                } else if (parentType === 'null') {
                  access.status = false
                }
              } else {
                access.status = !access.status
              }
            }
          })
        })
      }
    },
    changeAccess(type) {
      if (type === 'full') {
        // eslint-disable-next-line array-callback-return
        this.actions.map((item, index) => {
          this.changeActionStatus(item.name, index, type)
        })
      } else if (type === 'null') {
        // eslint-disable-next-line array-callback-return
        this.actions.map((item, index) => {
          this.changeActionStatus(item.name, index, type)
        })
      }
    },
  },
}
</script>

<style>
.drag-me {
  cursor: pointer;
}

.rotate-90 {
  transform: rotate(0deg);
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
}

.modal button {
  padding: 10px 20px;
}
</style>
