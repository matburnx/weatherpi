while [[ $# -gt 0 ]]; do
  case $1 in
    -n|--number)
      n="$2"
      shift # past argument
      shift # past value
      ;;
    -t|--time)
      t="$2"
      shift # past argument
      shift # past value
      ;;
    -h|--help)
      echo "This simple script calls bme280 every t seconds."
      echo "Usage: bash regular_measures.sh [-n <number> -t <number>]"
      echo "  -h|--help   : Show this message and stop"
      echo "  -n|--number : Number of measures you want to do"
      echo "  -t|--time   : Time (in seconds) between each measure"
      exit 0
      ;;
  esac
done

if [ -z ${n+x} ]; then
  n=10
fi

if [ -z ${t+x} ]; then
  t=2
fi

for ((i = 1 ; i <= $n ; i++)); do
  sleep $t
  echo "Measure $i :"
  ./bme280
done
