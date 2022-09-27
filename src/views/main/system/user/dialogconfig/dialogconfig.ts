import type { CmFormConfig } from "@/common-ui/types";

export const dialogconfig: CmFormConfig = {
  
  formItems: [
   
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
        field: 'password',
        type: 'password',
        label: '密码',
        placeholder: '请输入密码',
        isHide:true
      },
    {
      field: 'cellphone', 
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'roleId',
      type: 'select',
      label: '选择角色',
      placeholder: '请选择角色',
      options: [
       
      ]
    },
    {
        field: 'departmentId',
        type: 'select',
        label: '选择部门',
        placeholder: '请选择部门',
        options: [
         
        ]
      },
  ],
  labelwidth: "120px",
  colLayput: {
    span: 24,
  },
}