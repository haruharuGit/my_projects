Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :create]
      resources :profiles, only: [:create]
      resources :users, only: [] do # RESTfullなルーティングの生成をしない
        collection do
          get :check_user_id
        end
      end

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        sessions: 'api/v1/auth/sessions',
      }
    end
  end
end
