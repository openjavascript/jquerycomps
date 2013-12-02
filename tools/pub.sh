cur_dir=$PWD;
cd ..
dir=$PWD; 
cd $cur_dir;

sh merge.comps.sh

sh -c "cd $cur_dir/build && sh build.sh";

cd $cur_dir

echo $dir;
