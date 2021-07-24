<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userModel;

    public function __construct(User $user)
    {
        $this->userModel = $user;
    }

    public function index()
    {
        $users = $this->userModel->orderBy('id', 'desc')->get();
        $statusCode = 200;   // Code 200: OK, Request được tiếp nhận và xử lý thành công.
        if (!$users) {
            $statusCode = 400;  // 400: Bad Request: Server không thể xử lý hoặc sẽ không xử lý các Request lỗi của phía client (ví dụ Request có cú pháp sai hoặc Request lừa đảo định tuyến ...)
        }
        return response()->json($users, $statusCode);

    }

    public function store(Request $request)
    {
        $user = $this->userModel->create($request->all());
        $statusCode = 201;     // 201: Created (request đã dc xử lý thành công);
        if (!$user) {
            $statusCode = 500;   // 500:  Internal Server Error: Một thông báo chung chung, được đưa ra khi Server gặp phải một trường hợp bất ngờ, Message cụ thể là không phù hợp.
        }
        return response()->json($user, $statusCode);
    }


    public function show($id)
    {
        $user = $this->userModel->find($id);
        $statusCode = 200;
        if (!$user) {
            $statusCode = 404;  // 404:  Not Found: Các tài nguyên hiện tại không được tìm thấy nhưng có thể có trong tương lai. Các request tiếp theo của Client được chấp nhận.
        }
        return response()->json($user, $statusCode);
    }


    public function update(Request $request, $id)
    {
        $user = $this->userModel->find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->fill($request->all());
        $user->save();
        $data = [
            'user' => $user,
            'message' => 'Edit user successfully!'
        ];
        return response()->json($data, 200);

    }


    public function destroy($id)
    {
        $user = $this->userModel->find($id);
        $statusCode = 404;
        $message = 'User not found!';
        if ($user) {
            $user->delete();
           // $statusCode = 204;   204:  No Content: Server đã xử lý thành công request nhưng không trả về bất cứ content nào.
                                // nên khi dùng 204 thì sẽ k nhận đc bất kỳ ndung nào ở file json (bên angular k nhận đc message)
            $statusCode = 200;
            $message = 'Delete successfully!';
        }

        return response()->json(['message' => $message], $statusCode);
    }
}
