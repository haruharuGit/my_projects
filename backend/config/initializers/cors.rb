Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3000','https://my-projects-web.onrender.com'

    resource '*',
        headers: :any,
        expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'],
        methods: [:get, :post, :put, :patch, :delete, :options, :head]
        # credentials: true # Cookieを使用
  end
end
