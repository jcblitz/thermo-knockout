require 'sinatra'
require 'json'

get '/' do 
  erb :index

end

get '/api/status' do
  content_type :json
  { temperature: rand(50..90), running: 'heat', high: 80, low: 60 }.to_json
end