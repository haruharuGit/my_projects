class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  # ログイン処理
  def create
    super
  end

  # ログアウト処理
  def destroy
    super
  end

      # セッションリセットをスキップ
      # after_action :skip_reset_session, only: [:destroy]

      # private

      # def skip_reset_session
        # reset_session を呼び出さないようにする
        # デフォルトの動作を無効にする
      # end
end
