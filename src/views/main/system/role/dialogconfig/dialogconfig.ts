import type { CmFormConfig } from "@/common-ui/types";

export const dialogconfig: CmFormConfig = {
  
  formItems: [
   
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入用户名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    },
  
  ],
  labelwidth: "120px",
  colLayput: {
    span: 24,
  },
}