cur_dir=$PWD;
cd ..
dir=$PWD; 
cd $cur_dir;

echo "sleep done";

sh -c "node nodejs_merge.js";

#sleep 1s;

#sh -c "cd $dir && tar -cvpzf tmp.tgz lib.js"
#rm $dir/lib.js

sleep 1s;

sh -c "cd $cur_dir && sh generate_api_docs.sh";

#sh -c "cd $dir && tar -xvpzf tmp.tgz -C .";

#rm $dir/tmp.tgz

