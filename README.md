# register 프로필사진 등록변경

```diff
const registerUser = async (req: Request, res: Response) => {
- const { name, email, password, photoUrl } = req.body;
+ const { name, email, password, photoBase64 } = req.body;

  try {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
-	user.photoUrl = photoUrl;
+   user.photoBase64 = photoBase64;

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
  }
};
```

### 서버 전송크기 조정

등록시 프론트엔드에서 `PayloadTooLargeError: request entity too large`가 발생하면 index.ts를 수정해준다.

```diff
...
+import bodyParser from "body-parser";

const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

+// JSON 요청의 최대 크기를 50mb로 설정
+app.use(bodyParser.json({ limit: "50mb" }));

+// URL-encoded 요청의 최대 크기를 50mb로 설정
+app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
```
