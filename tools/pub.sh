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

rm -rf $dir/deploy/docs
rm -rf $dir/deploy/docs_api
rm -rf $dir/deploy/tools
rm -rf $dir/deploy/document.html
rm -rf $dir/deploy/README.md
rm -rf $dir/deploy/*.7z
rm -rf $dir/deploy/bizs/*.7z
rm -rf $dir/deploy/*.tar
rm -rf $dir/deploy/*.zip
find $dir/deploy/ -name _demo | xargs rm -rf
find $dir/deploy/ -name *.php | xargs rm -rf

cd $cur_dir

sh -c "cd $dir/deploy/comps/Calendar && node nodejs_merge.js";
sh -c "cd $dir/deploy/comps/Panel && node nodejs_merge.js";
sh -c "cd $dir/deploy/comps/Form && node nodejs_merge.js";
sh -c "cd $dir/deploy/comps/LunarCalendar && node nodejs_merge.js";

cd $cur_dir

sh -c "cd $dir/tools/ && node node_compress_all.js";

echo $dir;
