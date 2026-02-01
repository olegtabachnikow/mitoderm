import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { DoctorType } from '@/types';
import styles from './DoctorListFilter.module.scss';
import Image from 'next/image';

type AreaType = 'צפון' | 'מרכז' | 'דרום' | 'all';
type ProfessionType = '1' | '2' | 'all';

interface Props {
  doctors: DoctorType[];
  setFilteredList: Dispatch<SetStateAction<DoctorType[]>>;
}

const DoctorListFilter: FC<Props> = ({ doctors, setFilteredList }) => {
  const [areaFilter, setAreaFilter] = useState<AreaType>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [professionFilter, setProfessionFilter] =
    useState<ProfessionType>('all');

  const cities = Array.from(
    new Set(
      doctors.filter((el) => el.city && el.city.length > 0).map((el) => el.city)
    )
  );

  const handleReset = () => {
    setAreaFilter('all');
    setCityFilter('all');
    setProfessionFilter('all');
  };

  useEffect(() => {
    let result = doctors;

    if (areaFilter !== 'all') {
      result = result.filter((el) => el.area === areaFilter);
    }

    if (cityFilter !== 'all') {
      result = result.filter((el) => el.city === cityFilter);
    }

    if (professionFilter !== 'all') {
      result = result.filter((el) => el.profession === professionFilter);
    }

    setFilteredList(result);
  }, [areaFilter, cityFilter, professionFilter, doctors]);

  return (
    <div>
      <select
        onChange={(e) => setAreaFilter(e.target.value as AreaType)}
        defaultValue={'all'}
        value={areaFilter}
        name="area-select"
        id="area-select"
      >
        <option value="" disabled>
          Select area
        </option>
        <option value="צפון">North</option>
        <option value="מרכז">Center</option>
        <option value="דרום">South</option>
        <option value="all">All</option>
      </select>
      <select
        onChange={(e) => setProfessionFilter(e.target.value as ProfessionType)}
        defaultValue={'all'}
        value={professionFilter}
        name="profession-select"
        id="profession-select"
      >
        <option value="" disabled>
          Filter by profession
        </option>
        <option value="1">Cosmetologist</option>
        <option value="2">Tracheologist</option>
        <option value="all">All</option>
      </select>
      <select
        onChange={(e) => setCityFilter(e.target.value as string)}
        defaultValue={'all'}
        value={cityFilter}
        name="city-select"
        id="city-select"
      >
        <option value="" disabled>
          Select city
        </option>
        {cities.map((el: string) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
        <option value="all">All</option>
      </select>
      <button onClick={handleReset} className={styles.resetButton}>
        <Image
          src="/images/reset.svg"
          width={25}
          height={25}
          alt="round arrow icon"
        />
      </button>
    </div>
  );
};

export default DoctorListFilter;
