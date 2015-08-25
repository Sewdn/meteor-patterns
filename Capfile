load 'deploy'
# This deploy script takes a parameter to define the number of instances to deploy (default is 1)
# ex: cap deploy -s instances=3

set :stages,        %w(production)
set :default_stage, "production"
set :stage_dir,     ".deploy"
require 'capistrano/ext/multistage'

set :application, "map"
set :domain,      "meteorpatterns.com"
set :scm,         :git

set :repository,  "ssh://git@github.com/Sewdn/meteor-patterns.git"
set :branch, "master"
set :git_enable_submodules, 1
set :deploy_via, :remote_cache

set :use_sudo, false
set :user, "mp"
set :ssh_options, { :forward_agent => true }
default_run_options[:pty] = true
ssh_options[:forward_agent] = true

set :app_port, 10000
set :env,         "master"

set :deploy_to,   "/home/mp/" + env + "/meteor"
set :logfile, env

set :default_environment, {
  'ROOT_URL' => "http://" + domain,
  'MONGO_URL' => "mongodb://localhost:27017/" + application + env,
  'PORT' => app_port + 1
}

# This is a Rails-specific param, just want to disable the functionality
set :normalize_asset_timestamps, false

# This would be set to an array of dirs from your app that you want
# to persist across deploys
set :shared_children, %w(log)

# Set this to 'meteor' if you don't use Meteorite
set :meteor, "meteor"
set :mrt, "mrt"


server domain, :app

namespace :deploy do
  task :restart, :roles => :app do
    run "forever stop #{current_path}/bundle/main.js"

    if instances = fetch(:instances, 1)
      (1..instances).each do |i|
        run "forever start -a -l #{shared_path}/log/#{logfile}.log -e #{shared_path}/log/#{logfile}_error.log #{current_path}/bundle/main.js", :env => { 'PORT' => i + app_port }
      end
    end
  end
  task :start, :roles => :app do
    if instances = fetch(:instances, 1)
      (1..instances).each do |i|
        run "forever start -a -l #{shared_path}/log/#{logfile}.log -e #{shared_path}/log/#{logfile}_error.log #{current_path}/bundle/main.js", :env => { 'PORT' => i + app_port }
      end
    end
  end
  task :stop, :roles => :app do
    run "forever stop #{current_path}/bundle/main.js"
  end
end

after "deploy:finalize_update" do
  run "cd #{release_path}; #{mrt} install"
  run "cd #{release_path}; #{meteor} bundle bundle.tgz"
  run "cd #{release_path}; tar xvf #{File.join(release_path, "bundle.tgz")}"
  run "rm -rf #{File.join(release_path, "bundle.tgz")}"
end


# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"