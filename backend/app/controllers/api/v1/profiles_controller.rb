class Api::V1::ProfilesController < ApplicationController
  def create
    @profile = Profile.new(profile_params)
    if @profile.save
      render json: { message: 'プロフィールが投稿できました', profile: profile_json(@profile) }, status: :created
    else
      render json: { errors: @profile.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:nickname, :kid_birthday).merge(user_id: current_api_v1_user.id)
  end

  def profile_json(profile)
    {
      id: profile.id,
      nickname: profile.nickname,
      kid_birthday: profile.kid_birthday

    }
  end
end
