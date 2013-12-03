cur_dir=$PWD;
cd ..
dir=$PWD; 
cd $cur_dir;

sh merge.comps.sh

rm -rf $dir/deploy
cd $dir
cd ../

mkdir jc_master_deploy/
cp -rf $dir/* jc_master_deploy
mv jc_master_deploy $dir/deploy/

rm -rf $dir/deploy/_demo
rm -rf $dir/deploy/docs
rm -rf $dir/deploy/docs_api
rm -rf $dir/deploy/document.html
rm -rf $dir/deploy/README.md
rm -rf $dir/deploy/*.php

cd $cur_dir

sh -c "cd $dir/tools/ && node node_compress_all.js";

echo $dir;
