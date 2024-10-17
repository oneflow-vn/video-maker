 API TTS - Chuyển đổi văn bản thành giọng nói 

 Mục đích 

Chuyển đổi văn bản thành giọng nói Tiếng Việt với ngữ điệu tự nhiên, đa dạng vùng miền.

 Url 

https://viettelai.vn/tts/speech\_synthesis

 Method 

POST

 Header 

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json |             |
| accept       | \*/\*            |             |

 Body 

| Key                 | Value    | Description                                                                                                            |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| speed               | Float    | Điều chỉnh tốc độ giọng nói. 0.8: tốc độ chậm nhất 0.9 1.0: tốc độ bình thường 1.1 1.2: tốc độ nhanh nhất              |
| text                | String   | Nội dung văn bản đầu vào cần chuyển đổi sang giọng đọc                                                                 |
| token               | String   | Token của bạn (lấy tại https://viettelai.vn/dashboard/token)                                                           |
| tts\_return\_option | Interget | Định dạng file âm thanh trả ra: 1: streaming 2: wav 3: mp3.                                                            |
| voice               | String   | Xác định giọng đọc trả ra (vd: hn-quynhanh). Xem mã code giọng đọc tại API: https://viettelai.vn/tts/voices            |
| without\_filter     | Boolean  | Có sử dụng filter để tăng chất lượng giọng hay không? - true: có sử dụng, tốc độ xử lý chậm hơn - false: không sử dụng |

 Response 

**1\. Trường hợp thành công**

Trả về file âm thanh có nội dung là giọng đọc của văn bản tương ứng (**request\_id** trả về ở Header)

**2\. Trường hợp thất bại**

| **#** | **Param**   | **Type** | **Description**               |
| ----- | ----------- | -------- | ----------------------------- |
| 1     | code        | Integer  | Mã lỗi trả về                 |
| 2     | vi\_message | String   | Thông báo chi tiết tiếng việt |
| 3     | en\_message | String   | Thông báo chi tiết tiếng anh  |

**3\. Bảng mã lỗi** 

| **#** | **Error Code** | **Description**                                                   |
| ----- | -------------- | ----------------------------------------------------------------- |
| 1     | 200            | Thành công                                                        |
| 2     | 400            | Sai dữ liệu đầu vào                                               |
| 3     | 401            | Chưa xác thực được người dùng                                     |
| 4     | 403            | Server nhận được dữ liệu nhưng người dùng không có quyền truy cập |
| 5     | 500            | Server xảy ra lỗi không lường trước                               |

**4\. Danh sách giọng đọc**

| **#** | **Name**     | **Description** | **Code**       |
| ----- | ------------ | --------------- | -------------- |
| 1     | Quỳnh Anh    | Nữ miền Bắc     | hn-quynhanh    |
| 2     | Diễm My      | Nữ miền Nam     | hcm-diemmy     |
| 3     | Mai Ngọc     | Nữ miền Trung   | hue-maingoc    |
| 4     | Phương Trang | Nữ miền Bắc     | hn-phuongtrang |
| 5     | Thảo Chi     | Nữ miền Bắc     | hn-thaochi     |
| 6     | Thanh Hà     | Nữ miền Bắc     | hn-thanhha     |
| 7     | Phương Ly    | Nữ miền Nam     | hcm-phuongly   |
| 8     | Thùy Dung    | Nữ miền Nam     | hcm-thuydung   |
| 9     | Thanh Tùng   | Nam miền Bắc    | hn-thanhtung   |
| 10    | Bảo Quốc     | Nam miền Trung  | hue-baoquoc    |
| 11    | Minh Quân    | Nam miền Nam    | hcm-minhquan   |
| 12    | Thanh Phương | Nữ miền Bắc     | hn-thanhphuong |
| 13    | Nam Khánh    | Nam miền Bắc    | hn-namkhanh    |
| 14    | Lê Yến       | Nữ miền Nam     | hn-leyen       |
| 15    | Tiến Quân    | Nam miền Bắc    | hn-tienquan    |
| 16    | Thùy Duyên   | Nữ miền Nam     | hcm-thuyduyen  |

 Ví dụ 

**cURL**

```plaintext
curl --location --request POST 'https://viettelai.vn/tts/speech_synthesis' \ 	--header 'accept: */*' \ 	--header 'Content-Type: application/json' \ 	--data-raw '{ 	"text": "Văn bản cần đọc", 	"voice": "hcm-diemmy", 	"speed": 1, 	"tts_return_option":3, 	"token": "$TOKEN", 	"without_filter":false}'
```

**Java**

```java
OkHttpClient client = new OkHttpClient().newBuilder() .build(); MediaType mediaType = MediaType.parse("application/json"); RequestBody body = RequestBody.create(mediaType, "{\n\"text\": \"Văn bản cần đọc\", \n\"voice\": \"hcm-diemmy\", \n\"speed\": 1,\n\"tts_return_option\":3, \n\"token\": \"$TOKEN\",\n\"without_filter\":false}"); Request request = new Request.Builder() .url("https://viettelai.vn/tts/speech_synthesis") .method("POST", body) .addHeader("accept", "*/*") .addHeader("Content-Type", "application/json") .build(); Response response = client.newCall(request).execute();
```

**Python**

```python
import requests import json url = "https://viettelai.vn/tts/speech_synthesis" payload = json.dumps({ "text": "Văn bản cần đọc", "voice": "hcm-diemmy", "speed": 1, "tts_return_option": 3, "token": "$TOKEN", "without_filter": False }) headers = { 'accept': '*/*', 'Content-Type': 'application/json' } response = requests.request("POST", url, headers=headers, data=payload) with open("audio.mp3", "wb") as file: file.write(response.content)
```