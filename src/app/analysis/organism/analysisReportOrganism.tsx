import { Box, CircularProgress, Typography } from "@mui/material";
import VulnerableSubjectsBox from "../molecule/vulnerableSubjectsBox";
import VulnerableTagsBox from "../molecule/vulnerableTagsBox";
import { useEffect, useState } from "react";
import useUserInfo from "@/src/hooks/useUserInfo";
import { mainfetch } from "@/src/api/apis/mainFetch";

const AnalysisReportOrganism = () => {
  const { userInfo, loading, error } = useUserInfo();
  const [isLoading, setIsLoading] = useState(true);
  const [vulnerableSubjects, setVulnerableSubjects] = useState<VulnerableSubject[]>();
  const [vulnerableTags, setVulnerableTags] = useState<VulnerableTag[]>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsResponse, tagsResponse] = await Promise.all([
          mainfetch("/analyses/vulnerable-subjects", { method: "GET" }, true),
          mainfetch("/analyses/vulnerable-tags", { method: "GET" }, true),
        ]);

        if (!subjectsResponse.ok || !tagsResponse.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }

        const subjectsData = await subjectsResponse.json();
        const tagsData = await tagsResponse.json();

        setVulnerableSubjects(subjectsData);
        setVulnerableTags(tagsData);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading || isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <Typography variant="h6" color="error">
          오류가 발생했습니다. 다시 시도해 주세요.
        </Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: {
            xs: "20px",
            sm: "36px",
          },
        }}
      >
        <Typography
          variant="h1"
          fontSize={{
            xs: "16px",
            sm: "28px",
          }}
          marginRight={{
            xs: "14px",
            sm: "24px",
          }}
        >
          분석 리포트
        </Typography>
        <Typography
          variant="body2"
          fontSize={{
            xs: "12px",
            sm: "20px",
          }}
          color="var(--c-gray4)"
        >
          내가 푼 기록을 바탕으로 취약점을 분석해줘요
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <VulnerableSubjectsBox
          title="과목별 리포트"
          userName={userInfo!.nickname}
          vulnerableSubjects={vulnerableSubjects!}
        />
        <VulnerableTagsBox
          title="태그별 리포트"
          userName={userInfo!.nickname}
          VulnerableTags={vulnerableTags!}
        />
      </Box>
    </Box>
  );
};

export default AnalysisReportOrganism;
