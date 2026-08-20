import { useTranslations } from "next-intl";

export interface MatSummaryProps {
  mat_static_horizontal_ment: string;
  mat_static_vertical_ment: string;
  mat_ohs_horizontal_ment: string;
  mat_ohs_vertical_ment: string;
  mat_ohs_knee_ment: string;
}

const MatSummary = ({
  mat_static_horizontal_ment,
  mat_static_vertical_ment,
  mat_ohs_horizontal_ment,
  mat_ohs_vertical_ment,
  mat_ohs_knee_ment,
}: MatSummaryProps ) => {
  const t = useTranslations("Index");
  return (
    <div className="grid grid-cols-[25%_25%_50%] gap-2">
      <span className="whitespace-pre-line">
        {
          `[${t('foot_horizon_weight_analysis')}]\n` +
          (mat_static_horizontal_ment ?? "\n") +
          `\n[${t('foot_verti_weight_analysis')}]\n` +
          (mat_static_vertical_ment ?? "\n")
        }
      </span>

      <span className="whitespace-pre-line">
        {
          `[${t('foot_horizon_weight_analysis')}]\n` +
          (mat_ohs_horizontal_ment ?? "\n") +
          `\n[${t('foot_verti_weight_analysis')}]\n` +
          (mat_ohs_vertical_ment ?? "\n")
        }
      </span>

      <span className="whitespace-pre-line">
        {`[${t('knee_instability_analysis')}]\n` + (mat_ohs_knee_ment ?? "")}
      </span>
    </div>
  );
};

export default MatSummary;