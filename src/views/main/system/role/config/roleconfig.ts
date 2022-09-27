import type { CmFormConfig, CmTableprop } from "@/common-ui/types";

export const config: CmFormConfig = {
  formItems: [
    {
      field: 'name',
      type: "input",
      label: "角色名",
      placeholder: "请输入角色名",
    },
    {
      field: 'intro',
      type: "input",
      label: "权限介绍",
      placeholder: "请输入权限",
    },
    {
      field: 'createAt',
      type: "datepicker",
      label: "创建时间",
      placeholder: "请选择创建时间",
      otherOptions: {
        "start-placeholder": "开始时间",
        "end-placeholder": "结束时间",
        type: "daterange",
      },
    },
  
  ],
  labelwidth: "120px",
 
}

export const Tableconfig: CmTableprop = {

  propList: [{
    label: '角色名 ',
    prop: 'name',
    minwidth: '100',
    slotName: 'name'

  },
  {
    label: '权限介绍',
    prop: 'intro',
    minwidth: '100',
    slotName: 'name'

  },
 
  {
    label: '创建时间',
    prop: 'createAt',
    minwidth: '100',
    slotName: 'createAt'

  },
  {
    label: '更新时间',
    prop: 'updateAt',
    minwidth: '100',
    slotName: 'updateAt'

  },
  {
    label: '操作',
    minwidth: '120',
    slotName: 'operate'

  },

  ],
  showIndex: true,
  showSelect: true
}



 