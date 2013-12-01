cur_dir=$PWD;
cd ..
dir=$PWD; 
cd $cur_dir;

echo "sleep done";

sh -c "node nodejs_merge.js";
sh -c "cd $dir/comps/Calendar && node nodejs_merge.js";
sh -c "cd $dir/comps/Panel && node nodejs_merge.js";
sh -c "cd $dir/comps/Form && node nodejs_merge.js";
sh -c "cd $dir/comps/LunarCalendar && node nodejs_merge.js";

sleep 1s;

sh -c "cd $dir && tar -cvpzf tmp.tgz common.js JC.js jquery.js comps/BaseMVC/BaseMVC.js"
rm $dir/common.js
rm $dir/JC.js
rm $dir/jquery.js
rm $dir/comps/BaseMVC/BaseMVC.js

sleep 1s;

sh -c "cd $cur_dir && sh generate_api_docs.sh";

sh -c "cd $dir && tar -xvpzf tmp.tgz -C .";
#mv $dir/BaseMVC.js comps/BaseMVC/BaseMVC.js

rm $dir/tmp.tgz

rm -rf $dir/deploy
cd $dir
cd ../

mkdir jc_master_deploy/
cp -rf $dir/* jc_master_deploy
mv jc_master_deploy $dir/deploy/

sh -c "cd $dir/tools/ && node node_compress_all.js";

echo $dir;
