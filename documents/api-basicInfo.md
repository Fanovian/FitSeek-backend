# FitSeek API 接口说明：用户基本信息接口

- **服务器地址及端口**: `https://api.fanovian.cc:3000/`
- **基础 URL**: `/api/profile`
- **内容类型**: `application/json`

## 获取用户基本信息（User 表）

- **路由**: `GET /api/profile/getBasicInfo`
- **头部信息**：需要在 header 中填入登录时返回的 JWT Token，格式为 `Authorization Bearer {token}`。注意 token 不用加上引号。
- **请求参数**：无参数
- **请求示例（bash 命令行版本）**：
    ```bash
    curl -k -X GET https://api.fanovian.cc:3000/api/profile/getBasicInfo \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIU...luppyvWY"
    ```
- **返回示例**：
  
    （成功）
    ```json
    {"success":true,"user":{"user_id":"682986bfc7652616e5ffa73a",
    "name":"fitseek-user","tel":"13638294839",
    "type":"user","created_at":"2025-05-18T07:05:35.293Z"}
    ```

## 修改用户名

- **路由**: `POST /api/profile/updateUsername`
- **头部信息**：需要在 header 中填入登录时返回的 JWT Token，格式为 `Authorization Bearer {token}`。
- **请求参数**：
  | 参数名 | 类型   | 是否必填 | 描述           |
  | ------ | ------ | -------- | -------------- |
  | newName | string | 是       | 新用户名（会检查是否和别的用户名重名） |
- **请求示例（bash 命令行版本）**：
    ```json
    curl -k -X POST https://api.fanovian.cc:3000/api/profile/updateUsername \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJh...yvWY" \
  -d '{
    "newName": "fitseek-user-new"
  }'
    ```
- **返回示例**：
    ```json
    {"success":true,"message":"用户名更新成功","user":{"user_id":"682986bfc7652616e5ffa73a","name":"fitseek-user-new"}}
    ```
    ```json
    {"success":false,"message":"用户名已存在"}
    ```

## 修改用户密码

- **路由**: `POST /api/profile/updatePassword`
- **头部信息**：需要在 header 中填入登录时返回的 JWT Token，格式为 `Authorization Bearer {token}`。
- **请求参数**：
  | 参数名   | 类型   | 是否必填 | 描述           |
  | -------- | ------ | -------- | -------------- |
  | oldPassword  | string | 是       | 旧密码         |
  | newPassword  | string | 是       | 新密码         |
- **请求示例（bash 命令行版本）**：
    ```bash
    curl -k -X POST https://api.fanovian.cc:3000/api/profile/updatePassword \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ...yvWY" \
  -d '{
    "oldPassword": "fitseek-user",
    "newPassword": "fitseek-user-new"
  }'
    ```
- **返回示例**：
    ```json
    {"success":true,"message":"密码更新成功"}
    ```
    ```json
    {"success":false,"message":"旧密码不正确"}
    ```