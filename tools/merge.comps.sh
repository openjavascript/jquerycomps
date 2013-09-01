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

sh -c "cd $dir && tar -cvpzf tmp.tgz common.js JC.js"
rm $dir/common.js
rm $dir/JC.js

sh -c "cd $cur_dir && sh generate_api_docs.sh";

sh -c "cd $dir && tar -xvpzf tmp.tgz -C .";
rm $dir/tmp.tgz

echo $dir;
