class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  # ログイン処理
  def create
    super
  end

  # ログアウト処理
  def destroy
    super
  end
end
