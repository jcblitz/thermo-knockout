require 'json'
require 'sinatra/base'

class ThemoHome < Sinatra::Application
  @@thermo = { temperature: 75, running: 'heat', high: 80, low: 70 }

  get '/' do
    erb :index
  end

  get '/api/sample' do
    content_type :json
    @@thermo[:temperature] = rand(50..90)

    temp = @@thermo[:temperature]
    high = @@thermo[:high]
    low = @@thermo[:low]


    if (temp > high)
      @@thermo[:running] = 'ac'
    elsif (temp < low)
      @@thermo[:running] = 'heat'
    else
      @@thermo[:running] = 'none'
    end

    return @@thermo.to_json
  end

  get '/api/status' do
    content_type :json
    return @@thermo.to_json
  end
end

