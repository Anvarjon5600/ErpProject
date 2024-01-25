import LoadingPage from '../Loading/LoadingPage.vue';
import { __VLS_internalComponent, __VLS_componentsOption, __VLS_name } from './DashboardPage.vue';

function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'LoadingPage', typeof __VLS_localComponents, "LoadingPage", "LoadingPage", "LoadingPage"> &
__VLS_WithComponent<'NuxtLink', typeof __VLS_localComponents, "NuxtLink", "nuxtLink", "nuxt-link">;
__VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div;
__VLS_components.LoadingPage;
// @ts-ignore
[LoadingPage,];
__VLS_intrinsicElements.h1; __VLS_intrinsicElements.h1;
__VLS_components.NuxtLink; __VLS_components.NuxtLink; __VLS_components.nuxtLink; __VLS_components.nuxtLink; __VLS_components["nuxt-link"]; __VLS_components["nuxt-link"];
// @ts-ignore
[NuxtLink, NuxtLink,];
__VLS_intrinsicElements.img;
__VLS_intrinsicElements.h5; __VLS_intrinsicElements.h5;
{
const __VLS_0 = __VLS_intrinsicElements["div"];
const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
const __VLS_2 = __VLS_1({ ...{}, class: ("w-full m-1"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, class: ("w-full m-1"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
if (__VLS_ctx.isLoading) {
{
const __VLS_5 = ({} as 'LoadingPage' extends keyof typeof __VLS_ctx ? { 'LoadingPage': typeof __VLS_ctx.LoadingPage; } : typeof __VLS_resolvedLocalAndGlobalComponents).LoadingPage;
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({ ...{}, class: ("absolute left-[50%] top-[8px] translate-x-[-50%]"), }));
({} as { LoadingPage: typeof __VLS_5; }).LoadingPage;
const __VLS_7 = __VLS_6({ ...{}, class: ("absolute left-[50%] top-[8px] translate-x-[-50%]"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{}, class: ("absolute left-[50%] top-[8px] translate-x-[-50%]"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
}
// @ts-ignore
[isLoading,];
}
{
const __VLS_10 = __VLS_intrinsicElements["div"];
const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
const __VLS_12 = __VLS_11({ ...{}, class: ("dashboardBox border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{}, class: ("dashboardBox border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md"), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
{
const __VLS_15 = __VLS_intrinsicElements["h1"];
const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
const __VLS_17 = __VLS_16({ ...{}, class: ("font-bold text-[#3b89e9]"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{}, class: ("font-bold text-[#3b89e9]"), });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
(__VLS_ctx.$t('pages.dashboard.headerName'));
(__VLS_18.slots!).default;
}
(__VLS_13.slots!).default;
}
{
const __VLS_20 = __VLS_intrinsicElements["div"];
const __VLS_21 = __VLS_elementAsFunctionalComponent(__VLS_20);
const __VLS_22 = __VLS_21({ ...{}, class: ("flex flex-wrap justify-start items-start h-[0px] gap-10 m-5"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{}, class: ("flex flex-wrap justify-start items-start h-[0px] gap-10 m-5"), });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.items)!)) {
{
const __VLS_25 = ({} as 'NuxtLink' extends keyof typeof __VLS_ctx ? { 'NuxtLink': typeof __VLS_ctx.NuxtLink; } : 'nuxtLink' extends keyof typeof __VLS_ctx ? { 'NuxtLink': typeof __VLS_ctx.nuxtLink; } : 'nuxt-link' extends keyof typeof __VLS_ctx ? { 'NuxtLink': (typeof __VLS_ctx)["nuxt-link"]; } : typeof __VLS_resolvedLocalAndGlobalComponents).NuxtLink;
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({ ...{}, key: ((index)), to: ((item.url)), class: ("flex flex-col items-center hover:shadow-lg duration-[0.2s] w-full max-w-[150px] h-[] bg-white border border-gray-200 rounded-lg shadow"), }));
({} as { NuxtLink: typeof __VLS_25; }).NuxtLink;
({} as { NuxtLink: typeof __VLS_25; }).NuxtLink;
const __VLS_27 = __VLS_26({ ...{}, key: ((index)), to: ((item.url)), class: ("flex flex-col items-center hover:shadow-lg duration-[0.2s] w-full max-w-[150px] h-[] bg-white border border-gray-200 rounded-lg shadow"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_25, typeof __VLS_27> & Record<string, unknown>) => void)({ ...{}, key: ((index)), to: ((item.url)), class: ("flex flex-col items-center hover:shadow-lg duration-[0.2s] w-full max-w-[150px] h-[] bg-white border border-gray-200 rounded-lg shadow"), });
const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27)!;
let __VLS_29!: __VLS_NormalizeEmits<typeof __VLS_28.emit>;
{
const __VLS_30 = __VLS_intrinsicElements["div"];
const __VLS_31 = __VLS_elementAsFunctionalComponent(__VLS_30);
const __VLS_32 = __VLS_31({ ...{}, class: ("flex justify-center items-center w-full p-3"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_30, typeof __VLS_32> & Record<string, unknown>) => void)({ ...{}, class: ("flex justify-center items-center w-full p-3"), });
const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32)!;
let __VLS_34!: __VLS_NormalizeEmits<typeof __VLS_33.emit>;
{
const __VLS_35 = __VLS_intrinsicElements["img"];
const __VLS_36 = __VLS_elementAsFunctionalComponent(__VLS_35);
const __VLS_37 = __VLS_36({ ...{}, class: ("w-[110px]"), src: ("@/assets/images/desktop.png"), alt: ("image"), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_35, typeof __VLS_37> & Record<string, unknown>) => void)({ ...{}, class: ("w-[110px]"), src: ("@/assets/images/desktop.png"), alt: ("image"), });
const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37)!;
let __VLS_39!: __VLS_NormalizeEmits<typeof __VLS_38.emit>;
}
(__VLS_33.slots!).default;
}
{
const __VLS_40 = __VLS_intrinsicElements["div"];
const __VLS_41 = __VLS_elementAsFunctionalComponent(__VLS_40);
const __VLS_42 = __VLS_41({ ...{}, class: ("p-5 w-full"), }, ...__VLS_functionalComponentArgsRest(__VLS_41));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_40, typeof __VLS_42> & Record<string, unknown>) => void)({ ...{}, class: ("p-5 w-full"), });
const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_40, __VLS_42)!;
let __VLS_44!: __VLS_NormalizeEmits<typeof __VLS_43.emit>;
{
const __VLS_45 = __VLS_intrinsicElements["div"];
const __VLS_46 = __VLS_elementAsFunctionalComponent(__VLS_45);
const __VLS_47 = __VLS_46({ ...{}, class: ("flex justify-center"), }, ...__VLS_functionalComponentArgsRest(__VLS_46));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_45, typeof __VLS_47> & Record<string, unknown>) => void)({ ...{}, class: ("flex justify-center"), });
const __VLS_48 = __VLS_pickFunctionalComponentCtx(__VLS_45, __VLS_47)!;
let __VLS_49!: __VLS_NormalizeEmits<typeof __VLS_48.emit>;
{
const __VLS_50 = __VLS_intrinsicElements["h5"];
const __VLS_51 = __VLS_elementAsFunctionalComponent(__VLS_50);
const __VLS_52 = __VLS_51({ ...{}, class: ("mb-2 text-[14px] truncate font-bold tracking-tight text-gray-900"), }, ...__VLS_functionalComponentArgsRest(__VLS_51));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_50, typeof __VLS_52> & Record<string, unknown>) => void)({ ...{}, class: ("mb-2 text-[14px] truncate font-bold tracking-tight text-gray-900"), });
const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_50, __VLS_52)!;
let __VLS_54!: __VLS_NormalizeEmits<typeof __VLS_53.emit>;
(item.name);
(__VLS_53.slots!).default;
}
(__VLS_48.slots!).default;
}
(__VLS_43.slots!).default;
}
(__VLS_28.slots!).default;
}
// @ts-ignore
[$t, items,];
}
(__VLS_23.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
var __VLS_slots!: {};
return __VLS_slots;
}
