Mongoweb::Application.routes.draw do
  match '/:controller(/:action(/:id))'
  root :to => 'home#index'

  match '*path', :controller => 'redirect', :action => 'index'
end
