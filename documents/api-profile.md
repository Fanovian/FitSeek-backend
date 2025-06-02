# FitSeek API 接口说明：用户资料接口

- **服务器地址及端口**: `https://api.fanovian.cc:3000/`
- **基础 URL**: `/api/profile`
- **内容类型**: `application/json`

## 获取用户资料

- **路由**: `GET /api/profile/get`
- **头部信息**：需要在 header 中填入登录时返回的 JWT Token，格式为 `Authorization Bearer {token}`。注意 token 不用加上引号。
- **请求参数**：无参数
- **请求示例（bash 命令行版本）**：
    ```bash
    curl -k -X GET https://api.fanovian.cc:3000/api/profile/get \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIU...luppyvWY"
    ```
- **返回示例**：
  
    （成功）
    ```json
    {"success":true,"profile":{"_id":"683c1a554d6fdcf6d5bc6798","user_id":"682986bfc7652616e5ffa73a",
    "age":20,"gender":"male","height":175,"weight_goal":55,"__v":0}}
    ```
    （失败）
    ```json
    {"success":false,"message":"未提供 Token"}
    ```
    ```json
    {"success":false,"message":"无效 Token","error":{"name":"JsonWebTokenError","message":"jwt malformed"}}
    ```

实现原理：每一个 token 实际上都对应着一个 userID，表的设计中实际是有 userID 字段的，但是前端不需要传入这个参数，只需要在头部指定 token 即可，后端会根据 token 中的 userID 查询对应的用户资料。

注意，token 的有效期为 7 天，过期后需要重新登录获取新的 token。

## 修改用户资料

- **路由**: `POST /api/profile/update`
- **头部信息**：需要在 header 中填入登录时返回的 JWT Token，格式为 `Authorization Bearer {token}`。
- **请求参数**：
  | 参数名 | 类型   | 是否必填 | 描述           |
  | ------ | ------ | -------- | -------------- |
  | age | number | 是       | 年龄 |
    | gender | string | 是       | 只能在 `male`, `female` 和 `other` 中选择         |
    | height | number | 是       | 身高，单位为厘米           |
    | weight_goal | number | 是       | 体重目标，单位为千克           |
- **请求示例（bash 命令行版本）**：
    ```json
    curl -k -X POST https://api.fanovian.cc:3000/api/profile/update \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1N...s0FfO40Y-E_2kvUkz0" \
  -d '{
    "age": 20,
    "gender": "male",
    "height": 175,
    "weight_goal": 55.0
  }'
    ```
- **返回示例**：
    ```json
    {"success":true,"profile":{"_id":"683c1a554d6fdcf6d5bc6798","user_id":"682986bfc7652616e5ffa73a",
    "age":20,"gender":"male","height":175,"weight_goal":55,"__v":0}}
    ```
