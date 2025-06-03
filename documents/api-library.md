# FitSeek API 接口说明：食物库与训练库接口

- **服务器地址及端口**: `https://api.fanovian.cc:3000/`
- **基础 URL**: `/api/`
  - 食物库: `/api/foodlib`
  - 训练库: `/api/trainlib`
- **内容类型**: `application/json`

## 获取食物库/训练库列表（管理员&用户）

- **路由**: `GET /api/xxx/get`，其中 `xxx` 可以是 `foodlib` 或 `trainlib`，分别对应食物库和训练库。
- **请求参数**: 无参数。
- **返回类型**: 返回食物库或训练库的列表。
- **请求示例（bash 命令行版本）**：
  ```bash
  curl -X GET https://api.fanovian.cc:3000/api/foodlib/get \
  -H "Content-Type: application/json"
  ```
- **返回示例**:
  ```json
  {"success":true,
  "foods":[
    {"_id":"683eb8b4a5c780774c69132e",
    "food_id":"683eb8b4a5c780774c69132d",
    "name":"大米饭",
    "calories":132,
    "category":"staple",
    "note":"一碗（100g）",
    "__v":0}
    ]
  }
  ```

## 添加食物/训练（管理员）

- **路由**: `POST /api/xxx/add`，其中 `xxx` 可以是 `foodlib` 或 `trainlib`。
- **请求参数**:

  ***>>> 食物***
  | 参数 | 类型 | 是否必填 | 说明 |
  | ---- | ---- | -------- | ---- |
  | name | string | 是 | 食物名称 |
  | calories | number | 是 | 食物的卡路里（单位：kcal） |
  | category | string | 是 | 食物类别，在 `staple`（主食）, `vegetable`（蔬菜）, `fruit`（水果）, `meat`（肉类）, `dairy`（乳制品）, `snack`（零食）, `drink`（饮料）, `other`（其他）中选择 |
  | note (可选) | string | 否 | 附加备注信息 |

  ***>>> 训练***
  | 参数 | 类型 | 是否必填 | 说明 |
  | ---- | ---- | -------- | ---- |
  | name | string | 是 | 训练名称 |
  | category | string | 是 | 训练类别，在 `aerobic`（有氧）, `anaerobic`（无氧）, `streching`（拉伸）, `other`（其他）中选择 |
  | note (可选) | string | 否 | 附加备注信息 |
- **请求示例（bash 命令行版本）**：
  ```bash
  curl -X POST https://api.fanovian.cc:3000/api/trainlib/add \
  -H "Content-Type: application/json" \
  -d '{
    "name": "慢跑",
    "category": "aerobic",
    "note": "中等强度的有氧运动，目的在以较慢或中等的节奏来跑完一段相对较长的距离，以达到热身或锻炼的目的"
  }'
  ```
- **返回示例**：
  ```json
  {"success":true,
  "train":{
    "train_id":"683ec28a77b03dd698b5e5bb",
    "name":"慢跑",
    "category":"aerobic",
    "note":"中等强度的有氧运动，目的在以较慢或中等的节奏来跑完一段相对较长的距离，以达到热身或锻炼的目的",
    "_id":"683ec28a77b03dd698b5e5bc",
    "__v":0}
  }
  ```
- 记得保存返回的 id。

## 修改食物/训练（管理员）

- **路由**: `POST /api/xxx/modify`，其中 `xxx` 可以是 `foodlib` 或 `trainlib`。
- **请求参数**：与其他修改类似，提供刚才返回的 id 以及 add 中的内容（即使某些字段没有修改也需要重新提供）。

## 删除食物/训练（管理员）

- **路由**: `POST /api/xxx/delete`，其中 `xxx` 可以是 `foodlib` 或 `trainlib`。
- **请求参数**：需要删除的 item 的 id。