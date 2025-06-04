# FitSeek-API 速查

## 用户认证相关

| 接口名称           | 功能简述 |
| ------------------ | -------- |
| /api/auth/register | 用户注册 |
| /api/auth/login    | 用户登录 |

## 用户记录相关

| 接口名称             | 功能简述           |
| -------------------- | ------------------ |
| /api/fitness/get     | 获取用户的健康记录 |
| /api/fitness/add     | 添加健康记录       |
| /api/fitness/modify  | 修改健康记录       |
| /api/fitness/delete  | 删除健康记录       |
| /api/diet/get        | 获取用户的饮食记录 |
| /api/foodlib/get     | 获取食物库列表     |
| /api/diet/add        | 添加饮食记录       |
| /api/diet/modify     | 修改饮食记录       |
| /api/diet/delete     | 删除饮食记录       |
| /api/training/get    | 获取用户的训练记录 |
| /api/trainlib/get    | 获取训练库列表     |
| /api/training/add    | 添加训练记录       |
| /api/training/modify | 修改训练记录       |
| /api/training/delete | 删除训练记录       |

## 用户资料相关

| 接口名称              | 功能简述         |
| --------------------- | ---------------- |
| /api/profile/getBasicInfo      | 获取用户基本信息（User 表） |
| /api/profile/updateUsername      | 修改用户名 |
| /api/profile/updatePassword      | 修改密码 |
| /api/profile/get      | 获取用户个人资料 |
| /api/profile/modify   | 修改用户个人资料 |
| /api/announcement/get | 获取公告         |
| /api/article/get      | 获取文章         |

## 管理员相关

| 接口名称                        | 功能简述       |
| ------------------------------- | -------------- |
| /api/admin/login                | 管理员登录     |
| /api/admin/user/get             | 获取用户列表   |
| /api/admin/user/delete          | 删除用户       |
| /api/announcement/publish | 发布公告       |
| /api/announcement/delete  | 删除公告       |
| /api/article/publish      | 发布文章       |
| /api/article/delete       | 删除文章       |
| /api/foodlib/add          | 加入到食物库   |
| /api/foodlib/modify       | 修改食物库信息 |
| /api/foodlib/delete       | 从食物库中删除 |
| /api/trainlib/add         | 加入到训练库   |
| /api/trainlib/modify      | 修改训练库信息 |
| /api/trainlib/delete      | 从训练库中删除 |