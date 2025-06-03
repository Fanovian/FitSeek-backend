# FitSeek API 接口说明：公告与文章接口

- **服务器地址及端口**: `https://api.fanovian.cc:3000/`
- **基础 URL**: `/api/`
  - 公告: `/api/announcement`
  - 文章: `/api/article`
- **内容类型**: `application/json`

> 注意：\
    1. 该接口不需要登录验证，任何人都可以访问。\
    2. 公告和文章内部使用 string 存储，前端采用 Markdown 格式渲染。

## 获取公告/文章列表（管理员&用户）

- **路由**: `GET /api/xxx/get`，其中 `xxx` 可以是 `announcement` 或 `article`，分别对应公告和文章。
- **请求参数**: 无参数。
- **返回类型**: 返回公告或文章的列表。
- **请求示例（bash 命令行版本）**：
  ```bash
  curl -X GET https://api.fanovian.cc:3000/api/article/get \
  -H "Content-Type: application/json"
  ```
- **返回示例**:
  ```json
  {"success":true,
  "articles":
  [
    {"_id":"683eb60a9b43a098b0ceb522",
    "art_id":"683eb60a9b43a098b0ceb521",
    "publisher_name":"fitseek-admin",
    "content":"# Test Article",
    "publish_time":"2025-06-03T08:44:58.455Z","__v":0}
    ]
  }
  ```

## 发布公告/文章（管理员）

- **路由**: `POST /api/xxx/publish`，其中 `xxx` 可以是 `announcement` 或 `article`。
- **请求参数**:
  | 参数 | 类型 | 是否必填 | 说明 |
    | ---- | ---- | -------- | ---- |
    | content | string | 是 | 公告或文章内容，使用 Markdown 格式。 |
    | publisher_name | string | 是 | 发布者名称（直接采用当前登录的管理员的用户名，不允许修改） |
- **请求示例（bash 命令行版本）**：
  ```bash
  curl -X POST https://api.fanovian.cc:3000/api/announcement/publish \
  -H "Content-Type: application/json" \
  -d '{
    "publisher_name": "fitseek-admin",
    "content": "# Test Announcement"
  }'
  ```
- **返回示例**:
  ```json
  {"success":true,
  "announcement":{
    "ann_id":"683ebb58a5c780774c69133b",
    "publisher_name":"fitseek-admin",
    "content":"# Test Announcement",
    "publish_time":"2025-06-03T09:07:36.862Z",
    "_id":"683ebb58a5c780774c69133c",
    "__v":0}
    }
    ```
- 记得存储好返回的 `ann_id` 或 `art_id`。

## 删除公告/文章（管理员）

- **路由**: `POST /api/xxx/delete`，其中 `xxx` 可以是 `announcement` 或 `article`。
- **请求参数**: 需要删除的公告或文章的 `ann_id` 或 `art_id`。