import { useTranslations } from 'next-intl';
import type { IBiaBodyBenchmark } from '../../../types/bia';



interface MetricItem {
  label: string;
  value: string | number;
  unit?: string;
}

interface MetricListProps {
  title: string;
  titleValue: string | number;
  items: MetricItem[];
}

function MetricList({ title, titleValue, items }: MetricListProps) {
  const t = useTranslations("Index")
  return (
    <div className="flex flex-col w-full gap-1 py-2">
      {/* 상단 메인 타이틀 (빨간색 강조) */}
      <div className="text-danger text-sm font-bold text-start">
        {title}: {titleValue}
      </div>

      {/* 구분선 */}
      <div className="relative h-[2px] rounded-full bg-sub800 shrink-0 mr-2" />

      {/* 리스트 영역 */}
      <div className="flex flex-col text-sm text-black leading-[1.75]">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center ">
            <span className="font-medium text-sub600">{t(item.label)}</span>
            <span className="font-bold">
              {item.value}
              {item.unit && <span className="ml-0.5 font-normal">{item.unit}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BodyBenchMark({data}: {data: IBiaBodyBenchmark}) {
  const t = useTranslations("Index")
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (data.body_score / 100) * circumference;
  const healthMetrics = [
    { label: "bia_target_weight", value: data.target_weight, unit: "kg" },
    { label: "bia_fat_control", value: data.fat_control_amount, unit: "kg" },
    { label: "bia_muscle_control", value: data.muscle_control, unit: "kg" },
    { label: "bia_recommended_caloric_intake", value: data.recommended_intake_kcal, unit: "kcal" },
    { label: "bia_fat_free_mass", value: data.lean_body_weight, unit: "kg" },
    { label: "bia_muscle_mass", value: data.muscle_mass, unit: "kg" },
    { label: "bia_bone_mass", value: data.bone_mass, unit: "kg" },
    { label: "bia_body_cell_mass", value: data.body_cell_mass, unit: "kg" },
    { label: "bia_visceral_abdominal_fat_info", value: data.waist_to_hip_ratio, unit: "" },
    { label: "bia_weight_to_standard_ratio", value: data.obesity_percentage, unit: "%" },
    { label: "bia_subcutaneous_fat", value: data.subcutaneous_fat_rate, unit: "%" },
  ];

  const bodyType = {
    1: "body_type_1",
    2: "body_type_2",
    3: "body_type_3",
    4: "body_type_4",
    5: "body_type_5",
    6: "body_type_6",
    7: "body_type_7",
    8: "body_type_8",
    9: "body_type_9"
  }[data.body_type]

  const bodyTypeImg = {
    1 : '/images/bt_1.png',
    2 : '/images/bt_2.png',
    3 : '/images/bt_3.png',
    4 : '/images/bt_4.png',
    5 : '/images/bt_5.png',
    6 : '/images/bt_6.png',
    7 : '/images/bt_7.png',
    8 : '/images/bt_8.png',
    9 : '/images/bt_9.png',
  }[data.body_type]
  return (
    <div className='flex flex-col rounded-xl border border-sub200'>
      <div className='flex w-fit bg-mainBlue-600 rounded-br-xl rounded-tl-xl text-base text-white font-semibold px-2 py-1'>
        {t('bia_key_health_indicators')}
      </div>

     
      <div className="flex justify-center items-center py-6 relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90" 
        >
          
          <circle
            stroke="#E5E7EB" 
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          
          <circle
            stroke="#5D8DFF" 
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.8s ease-in-out' }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-baseline">
            <span className="text-5xl font-bebas font-semibold text-sub800 leading-none">
              {data.body_score}
            </span>
            <span className="text-lg font-bold text-sub600 ml-1">{t('unit_score')}</span>
          </div>
        </div>
      </div>


      <div className='flex flex-1 flex-col gap-2 px-2'>
        <div className='flex gap-2'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={bodyTypeImg}
            alt='건강지표이미지'
            className='rounded-2xl print:rounded-xl bg-sub100 w-20 h-20 my-auto border-2 border-sub200/60'
          >
          </img>
          <div className='flex flex-col gap-0.5'>
            <div className='text-base font-bold text-black'>
              {t(bodyType ?? "")}
            </div>
            <div className='text-xs leading-[1.3] break-keep text-black'>
              {data.result_body_type_description}
            </div>
          </div>
        </div>

        <div className='grid grid-rows-[40%_60%] gap-4 h-full'>
          <MetricList 
            title={t('bia_weight_control')}
            titleValue={`${data.weight_control}kg`} 
            items={healthMetrics} 
          />
        </div>
      </div>
    </div>
  );
}