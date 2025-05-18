# FitSeek API 接口说明

## 概述

FitSeek 前端基于 Vue.js 和 React.js 开发，后端基于 Node.js 开发。FitSeek 提供了一套 RESTful API 接口，供前端和其他服务调用。

服务器的地址及端口为 `http://123.206.217.44:3000/`，所有接口均以 `/api` 开头。

## 用户认证接口

- **URL**: `/api/auth`
- **请求方式**: `POST`
- **内容类型**: `application/json`

### 用户注册

- **路由**: `POST /api/auth/register`
- **请求参数**：
  | 参数名 | 类型   | 是否必填 | 描述           |
  | ------ | ------ | -------- | -------------- |
    | tel | string | 是       | 电话号码，唯一         |
    | name | string | 是       | 用户名，唯一         |
    | password | string | 是       | 密码，至少 6 位字符 |
- **请求示例**：
    ```json
    {
      "tel": "12345678901",
      "name": "testuser",
      "password": "password123"
    }
    ```
- **返回示例**：
  
    （成功）
    ```json
    {
      "code": 200,
      "success": true,
      "user": {
        "user_id_": "xxxxxxxxxxx",
        "type": "user",
        "created_at": "2025-05-15T07:43:52.428Z",
      }
    }
    ```
    （失败）
    ```json
    {
      "code": 400,
      "success": false,
      "message": "用户名或手机号已存在"
    }
    ```

### 用户登录

- **路由**: `POST /api/auth/login`
- **请求参数**：
  | 参数名 | 类型   | 是否必填 | 描述           |
  | ------ | ------ | -------- | -------------- |
  | type | int | 是       | 登录形式，0 为手机号登录，1 为用户名登录 |
    | value | string | 是       | 电话号码或用户名         |
    | password | string | 是       | 密码           |
- **请求示例**：
  
    （手机号登录）
    ```json
    {
      "type": 0,
      "value": "12345678901",
      "password": "password123"
    }
    （用户名登录）
    ```json
    {
      "type": 1,
      "value": "testuser",
      "password": "password123"
    }
- **返回示例**：
    
    （成功）
    ```json
    {
      "code": 200,
      "success": true,
      "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "user": {
        "user_id": "xxxxxxxxxxx",
        "type": "user",
        "created_at": "2025-05-15T07:43:52.428Z",
      }
    }
    ```
    （失败）
    ```json
    {
      "code": 401,
      "success": false,
      "message": "用户名未注册"
    }
    ```
    ```json
    {
      "code": 401,
      "success": false,
      "message": "密码错误"
    }
    ```

> （目前先不做）注：登录后返回用户的 JWT Token，前端需要将其存储在本地（如 uni.setStorageSync），并在后续请求中将其放入请求头中，格式为 `Authorization Bearer {token}`。该 token 被用于身份认证，前端需要在每次请求中携带该 token。token 的有效期为 7 天，过期后需要重新登录获取新的 token。


