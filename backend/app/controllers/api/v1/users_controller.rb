class Api::V1::UsersController < ApplicationController
  # before_action :authenticate_api_v1_user!
  # 現在のユーザー情報を取得する
  def check_user_id
    if current_api_v1_user
      render json: { id: current_api_v1_user.id }
    else
      render json: { error: 'No user signed in' }, status: :unauthorized
    end
  end
end
