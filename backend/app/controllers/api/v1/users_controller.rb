class Api::V1::UsersController < ApplicationController
  # 現在のユーザー情報を取得する
  def check_user
    if current_api_v1_user
      render json: { is_login: true, data: current_api_v1_user }
    else
      render json: { is_login: false, message: 'ユーザーが存在していません' }, status: :unauthorized
    end
  end
end
