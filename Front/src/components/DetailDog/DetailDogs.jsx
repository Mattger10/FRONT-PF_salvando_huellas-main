export default function DetailDogs() {
  const dispatch = useDispatch();
  const DogDeits = useSelector((state) => state.dogDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <div>
        <button>
          <Link to="/adopt">Adóptame</Link>
        </button>
      </div>
      <div>
        {Object.keys(DogDeits).length > 0 ? (
          <div>
            <div>
              <h4>{DogDeits.name}</h4>
            </div>
            <img
              src={DogDeits.image}
              alt={DogDeits.name}
              width="200"
              height="150"
            />
            <div>
              <span>Age: {DogDeits.ageD}</span>
              <span>Sex: {DogDeits.sexD}</span>
              <span>Size: {DogDeits.sizeD}</span>
              <span>History: {DogDeits.historyD}</span>
              <span>References: {DogDeits.referencesD}</span>
            </div>
          </div>
        ) : (
          <div>
            {/* va a ir un logo/gif de carga y quizas se cambie el "Cargando" */}
            <p>Cargando</p>
          </div>
        )}
      </div>
    </div>
  );
}
