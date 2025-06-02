# FitSeek API 接口说明：记录管理接口

- **服务器地址及端口**: `https://api.fanovian.cc:3000/`
- **基础 URL**: `/api/`
  - 健康记录: `/api/fitness`
  - 饮食记录: `/api/diet`
  - 训练记录: `/api/training`
- **内容类型**: `application/json`

## 添加记录

- **路由**: `POST /api/xxx/add`，其中 `xxx` 可以是 `fitness`, `diet` 或 `training`，分别对应健康记录、饮食记录和锻炼记录。
- **头部信息**：需要在 header 中填入登录时返回的 JWT Token，格式为 `Authorization Bearer {token}`。注意 token 不用加上引号。
- **请求参数**：
  
    ***>>> 健康记录***
    | 参数名 | 类型   | 是否必填 | 描述           |
    | ------ | ------ | -------- | -------------- |
    | type | string | 是       | 在 `weight`, `body_fat`, `heart_rate`, `blood_oxygen` 中选择 |
    | value | number | 是       | 对应的单位是：kg; %（例如 20% 就填入 20）; 次/分钟; % |
    | note | string | 否       | 备注           |
    | time | Date | 是       | 默认就是当前时间，可以自定义，要匹配 Json 的 Date 格式           |

    ***>>> 饮食记录***
    | 参数名 | 类型   | 是否必填 | 描述           |
    | ------ | ------ | -------- | -------------- |
    | meal_type | string | 是       | 在 `breakfast`, `lunch`, `dinner`, `snack` 中选择 |
    | calories | number | 是       | 以千卡 KCAL 为单位   |
    | food_name | string | 是       | 食物名称        |
    | note | string | 否      | 备注          |
    | time | Date | 是       | 默认就是当前时间，可以自定义，要匹配 Json 的 Date 格式           |

    ***>>> 训练记录***
    | 参数名 | 类型   | 是否必填 | 描述           |
    | ------ | ------ | -------- | -------------- |
    | train_type | string | 是       | 在 `aerobic`, `anaerobic`, `streching`, `other` 中选择 |
    | duration | number | 是       | 以分钟为单位   |
    | content | string | 是       | 锻炼内容        |
    | note | string | 否      | 备注          |
    | time | Date | 是       | 默认就是当前时间，可以自定义，要匹配 Json 的 Date 格式           |
- **请求示例（bash 命令行版本）**：
    ```bash
    curl -X POST https://api.fanovian.cc:3000/api/diet/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJI...yvWY" \
  -d '{
    "meal_type": "lunch",
    "calories": 1500,
    "food_name": "烤肉拌饭"
  }'
    ```
- **返回示例**：
  
    （成功）
    ```json
    {"success":true,"record":{"user_id":"682986bfc7652616e5ffa73a",
    "record_id":"683d1b5158cc592c36ecd393","time":"2025-06-02T03:32:33.005Z","meal_type":"lunch","calories":1500,
    "food_name":"烤肉拌饭","note":"",
    "_id":"683d1b5158cc592c36ecd394",
    "created_at":"2025-06-02T03:32:33.006Z","__v":0}}
    ```

## 修改记录

- **路由**: `POST /api/xxx/modify`
- **头部信息**：需要在 header 中填入登录时返回的 JWT Token，格式为 `Authorization Bearer {token}`。
- **请求参数**：
  返回的 `record_id` 再加上 `api/xxx/add` 中的内容（即使某些字段没有变化，也需要重新提交）。
- **请求示例（bash 命令行版本）**：
    ```bash
    curl -X POST https://api.fanovian.cc:3000/api/fitness/modify \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbG...yvWY" \
    -d '{
        "record_id": "683c70ffcc3534d27434db2d",
        "type": "weight",
        "value": 78.5,
        "note": "First day of losing weight!"
    }'
    ```

## 获取记录

- **路由**: `GET /api/xxx/get`
- **头部信息**：需要在 header 中填入登录时返回的 JWT Token，格式为 `Authorization Bearer {token}`。
- **请求参数**：无参数
- **返回类型**：返回此用户的所有 xxx 记录，`xxx` 可以是 `fitness`, `diet` 或 `training`。
- **请求示例（bash 命令行版本）**：
    ```bash
    curl -X GET https://api.fanovian.cc:3000/api/diet/get \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJh...yvWY"
    ```

## 删除记录

- **路由**: `POST /api/xxx/delete`
- **头部信息**：需要在 header 中填入登录时返回的 JWT Token，格式为 `Authorization Bearer {token}`。
- **请求参数**：
  返回的 `record_id`。
- **请求示例（bash 命令行版本）**：
    ```bash
    curl -X POST http://localhost:3000/api/diet/delete \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhb...yvWY" \
    -d '{
        "record_id": "683d0e9bd34bddfa7e84dc8e"
    }'
    ```