import type { CmFormConfig, CmTableprop } from "@/common-ui/types";

export const config: CmFormConfig = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'enable',
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        { title: '启用', value: 1 },
        { title: '禁用', value: 0 }
      ]
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelwidth: "120px",
  colLayput: {
    span: 8,
  },
}

export const Tableconfig: CmTableprop = {
  propList: [{
    label: '商品名称',
    prop: 'name',
    minwidth: '100',
    

  },
  {
    label: '原价',
    prop: 'oldPrice',
    minwidth: '100',
    

  },
  {
    label: '现价',
    prop: 'newPrice',
    minwidth: '100',
  

  },
  {
    label: '图片',
    prop: 'imgUrl',
    minwidth: '100',
    slotName: 'img'

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



