<template>
    <div>
        <div class="container">
            <el-table class="table" :data="tableData" style="width: 100%" empty-text="nothing here">
                <el-table-column>
                <template slot-scope="scope">
                    <span>{{ scope.row.property }}</span>
                </template>
                </el-table-column>
                <el-table-column>
                <template slot-scope="scope">
                    <span>{{ scope.row.value }}</span>
                </template>
                </el-table-column>
                <el-table-column>
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
                </el-table-column>
                <el-table-column>
                <template slot-scope="scope">
                    <span>{{ scope.row.nameVal }}</span>
                </template>
                </el-table-column>
                <el-table-column>
                <template slot-scope="scope">
                    <span>{{ scope.row.system }}</span>
                </template>
                </el-table-column>
                <el-table-column>
                <template slot-scope="scope">
                    <span>{{ scope.row.systemVal }}</span>
                </template>
                </el-table-column>
            </el-table>
            <button @click="accesNewTable">access</button>
        </div>
        <div v-if="isCreateNewTable" class="content-box">
            <el-table :data="bodyRows" style="width: 100%" empty-text="nothing here">
                <el-table-column v-for="(cell, index) in headerCells" :key="index" :label="cell" :prop="cell">
                <template slot-scope="scope">
                    <el-input v-model="scope.row[cell]" :placeholder="cell"></el-input>
                </template>
                </el-table-column>
                <el-table-column label="Actions">
                <template slot-scope="scope">
                    <el-button size="mini" @click="removeRow(scope.$index)">Remove</el-button>
                </template>
                </el-table-column>
            </el-table>
        
            <el-button class="add-btn" type="primary" @click="addNewRow">Add row</el-button>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            tableData: [
                { property: 'Date', value: '2006.12.2023', name: 'Тип Платежа', nameVal: 'Тип Платежа value', system: 'Системный Номер', systemVal: 'Системный Номер value' },
                { property: 'Поставщик', value: 'Поставщик look up', name: 'Тип Платежа', nameVal: 'Тип Платежа value', system: 'Системный Номер', systemVal: 'Системный Номер value' },
                { property: 'Дата значения', value: '06/12/2023 12:49:31', name: 'Тип Платежа', nameVal: 'Тип Платежа value', system: 'Системный Номер', systemVal: 'Системный Номер value' },
                { property: 'Cash Type Value Lookup', value: 'Cash Type Value Lookup 1', name: 'Тип Платежа', nameVal: 'Тип Платежа value', system: 'Системный Номер', systemVal: 'Системный Номер value' },
                { property: 'Группа компаний', value: 'company look up', name: 'Тип Платежа', nameVal: 'Тип Платежа value', system: 'Системный Номер', systemVal: 'Системный Номер value' },
                { property: 'Водитель', value: 'Водитель input', name: 'Тип Платежа', nameVal: 'Тип Платежа value', system: 'Системный Номер', systemVal: 'Системный Номер value' }
            ],
            headerCells: ['No', 'Name', 'Surname', 'Email', 'Address'],
            bodyRows: [
            { No: '', Name: '', Surname: '', Email: '', Address: '' },
            { No: '', Name: '', Surname: '', Email: '', Address: '' }
            ],
            isCreateNewTable: false
        };
    },
    methods: {
        accesNewTable(){
            this.isCreateNewTable = true;
        },
        addNewRow() {
            this.bodyRows.push({ No: '', Name: '', Surname: '', Email: '', Address: '' });
        },
        removeRow(index) {
            this.bodyRows.splice(index, 1);
        }
    }
};
</script>
<style scoped>
.add-btn {
    width: 100px !important;
}
.container {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 50px;
}
.table {
    width: 100%;
}

.content-box {
    padding: 20px;
}
.add-btn {
width: 80px;
margin: 5px 0;
}
</style>