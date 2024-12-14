class Api::V1::ProfilesController < ApplicationController
  # before_action :authenticate_api_v1_user!
  before_action :set_user

  def show
  end

  def create
    profile = Profile.new(profile_params)
    if profile.save
      render json: profile, status: :created
    else
      render json: profile.errors, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:nickname, :kid_birthday).merge(user_id: @user.id)
  end

  def set_user
    @user = current_api_v1_user
  end
end
