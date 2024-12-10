class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  def render_create_success
    auth_token = @resource.create_new_auth_token
    render json: {
      data: resource_data(resource_json: @resource.token_validation_response),
      access_token: auth_token['access-token'],
      client: auth_token['client'],
      uid: auth_token['uid'],
    }
  end

  def sign_up_params
    params.permit(:email, :password, :password_confirmation)
  end
end
