Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :posts
      resources :profiles, only: [:create, :update, :destroy, :show]

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
      }
    end
  end
end
