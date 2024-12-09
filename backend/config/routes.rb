Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :posts
      resources :profiles, only: [:create, :update, :destroy, :show]
      get 'users/check_user', to: 'users#check_user'

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        sessions: 'api/v1/auth/sessions'
      }
    end
  end
end
