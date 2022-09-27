import type { CmFormConfig, CmTableprop } from "@/common-ui/types";
import { rowKey } from "element-plus/es/components/table-v2/src/common";

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
    label: '菜单名称',
    prop: 'name',
    minwidth: '100',
    slotName: 'name'

  },
  {
    label: '类型',
    prop: 'type',
    minwidth: '100',
   

  },
  {
    label: '菜单url',
    prop: 'url',
    minwidth: '100',


  },
  {
    label: '菜单图标',
    prop: 'icon',
    minwidth: '100',
 

  },
  {
    label: '按钮权限',
    prop: 'permission',
    minwidth: '100',
    

  },
  {
    label: '创建时间',
    prop: 'createAt',
    minwidth: '100',
    slotName: 'createAt'

  },
  {
    label: '操作',
    minwidth: '120',
    slotName: 'operate'

  },

  ],
  childrenProps:{
    rowKey:'id',
    treeProp:{
      children:'children'
    }
  },
  showfooter:false
}



