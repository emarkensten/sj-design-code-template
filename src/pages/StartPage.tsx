import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import Typography from "@sj-ab/component-library.ui.typography";
import Stack from "@sj-ab/component-library.ui.stack";
import InformationCard from "@sj-ab/component-library.ui.information-card";
import { TextField } from "@sj-ab/component-library.ui.text-field";
import { FlowButton } from "@sj-ab/component-library.ui.flow-button";
import { Switch } from "@sj-ab/component-library.ui.switch";
import { FormControlLabel } from "@sj-ab/component-library.ui.form-control-label";
import { PageLayout } from "../components/PageLayout";
import { useThemePreference } from "../theme/ThemeProvider";

/**
 * Exempelsida. Innehållet ligger direkt på sidan, inte i kort.
 * InformationCard är en av SJ:s färdiga kortkomponenter och därför ok.
 */
export function StartPage() {
  const { t } = useTranslation();
  const { resolved, setPreference } = useThemePreference();
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmittedName(name.trim() || null);
  };

  return (
    <PageLayout title={t("start.heading")} intro={t("start.intro")}>
      {/* Texten går i secondaryMeta; children renderas inte. */}
      <InformationCard
        variant="information"
        title={t("start.infoTitle")}
        titleVariant="h2"
        secondaryMeta={t("start.infoBody")}
      />

      <Stack component="form" useFlexGap spacing={2} onSubmit={handleSubmit}>
        <Typography variant="h2">{t("start.formHeading")}</Typography>
        <TextField
          id="name"
          autoComplete="given-name"
          label={t("start.nameLabel")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <Box>
          <FlowButton type="submit">{t("start.submit")}</FlowButton>
        </Box>
        {submittedName && (
          <Typography variant="bodyRegular" role="status">
            {t("start.greeting", { name: submittedName })}
          </Typography>
        )}
      </Stack>

      {/* Negativ marginal till vänster: switchen linjerar med rubriken ovanför. */}
      <FormControlLabel
        negativeMargins={{ left: true }}
        label={t("start.darkMode")}
        control={
          <Switch
            name="dark-mode"
            checked={resolved === "dark"}
            onChange={(_, checked) => setPreference(checked ? "dark" : "light")}
          />
        }
      />
    </PageLayout>
  );
}
