import TextTooltip from '@/components/MesheryMeshInterface/TextTooltip';
import { IconButton, Typography, Grid } from '@layer5/sistent';
import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  useGetModelCategoriesQuery,
  useLazyGetComponentsQuery,
  useLazyGetMeshModelsQuery,
  useLazyGetModelFromCategoryQuery,
  useLazyGetRelationshipsQuery,
} from '@/lib/rtk-query/queries/meshModel';
import { dataToColors } from '@/utils/charts';
import BBChart from '@/components/BBChart';
import { donut, pie } from 'billboard.js';
import Link from 'next/link';
import { renderTooltipContent } from '@/components/MesheryMeshInterface/TextTooltip';
import DashboardSection from '@/styles/DashboardSection';
import DashboardInfoOutlined from '@/styles/DashboardInfoOutlined';

function MeshModelContructs() {
  const [getAllModels] = useLazyGetMeshModelsQuery();
  const [getAllComponents] = useLazyGetComponentsQuery();
  const [getAllRelationships] = useLazyGetRelationshipsQuery();

  // States to hold total counts
  const [totalModels, setTotalModels] = useState(0);
  const [totalComponents, setTotalComponents] = useState(0);
  const [totalRelationships, setTotalRelationships] = useState(0);

  // Fetch data and update state on component mount
  const fetchData = useCallback(async () => {
    try {
      const models = await getAllModels({
        page: 1,
        pagesize: 'all',
      });
      const components = await getAllComponents({
        page: 1,
        pagesize: 'all',
      });
      const relationships = await getAllRelationships({
        page: 1,
        pagesize: 'all',
      });

      setTotalModels(models.data?.total_count);
      setTotalComponents(components.data?.total_count);
      setTotalRelationships(relationships.data?.total_count);
    } catch (error) {
      console.error('Error fetching Mesh Models data:', error);
    }
  }, [getAllModels, getAllComponents, getAllRelationships]);

  useEffect(() => {
    fetchData();
  }, []);

  // Data Cleanup
  const data = useMemo(() => {
    // TODO: Add Policies
    return [
      ['Models', totalModels],
      ['Components', totalComponents],
      ['Relationships', totalRelationships],
      // TODO: Add Policies
    ];
  }, [totalModels, totalRelationships, totalComponents]);

  const chartOptions = useMemo(
    () => ({
      data: {
        columns: data,
        type: donut(),
        colors: dataToColors(data),
      },
      arc: {
        cornerRadius: {
          ratio: 0.05,
        },
      },
      donut: {
        title: 'Registered\nCapabilities\nby Type',
        padAngle: 0.03,
      },
      tooltip: {
        format: {
          value: function (v) {
            return v;
          },
        },
      },
    }),
    [data],
  );

  const url = `https://docs.meshery.io/concepts/logical/models`;

  return (
    <Link href="/settings#registry">
      <DashboardSection>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" gutterBottom sx={{ cursor: 'pointer' }}>
            Registry
          </Typography>
          <div>
            <TextTooltip
              backgroundColor="#3C494F"
              placement="left"
              interactive="true"
              title={renderTooltipContent({
                showPriortext:
                  'Meshery uses a set of resource models to define concrete boundaries to ensure extensible and sustainable management.',
                showAftertext: 'to learn more about Models, Components, and Relationships',
                link: url,
              })}
            >
              <IconButton
                disableRipple={true}
                disableFocusRipple={true}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <DashboardInfoOutlined />
              </IconButton>
            </TextTooltip>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BBChart options={chartOptions} />
        </div>
      </DashboardSection>
    </Link>
  );
}

function MeshModelCategories() {
  const [categoryMap, setCategoryMap] = useState({});
  const { data: categories } = useGetModelCategoriesQuery();
  const [getModelFromCategory] = useLazyGetModelFromCategoryQuery();

  useEffect(() => {
    const fetchModelsForCategories = async () => {
      if (categories) {
        const updatedCategoryMap = { ...categoryMap };
        for (const category of categories.categories) {
          const categoryName = category.name;
          if (!updatedCategoryMap[categoryName]) {
            const { data: models } = await getModelFromCategory({
              page: 1,
              pagesize: 'all',
              category: categoryName,
            });
            updatedCategoryMap[categoryName] = models?.total_count || 0;
          }
        }
        setCategoryMap(updatedCategoryMap);
      }
    };

    fetchModelsForCategories();
  }, [categories]);

  const cleanedData = useMemo(
    () => Object.keys(categoryMap).map((key) => [key, categoryMap[key]]),
    [categoryMap],
  );

  const chartOptions = useMemo(
    () => ({
      data: {
        columns: cleanedData,
        colors: dataToColors(cleanedData),
        type: pie(),
      },
      tooltip: {
        format: {
          value: function (v) {
            return `${v} Models`;
          },
        },
      },
      legend: {
        show: false,
      },
    }),
    [cleanedData],
  );

  const url = `https://docs.meshery.io/concepts/logical/models`;
  return (
    <Link href="/settings#registry">
      <DashboardSection>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" gutterBottom sx={{ cursor: 'pointer' }}>
            Categories
          </Typography>
          <div>
            <TextTooltip
              backgroundColor="#3C494F"
              title={renderTooltipContent({
                showPriortext:
                  'Each Model corresponds to a category, so the category shows the high-level use case of that model, e.g., prometheus is under “Observability and Analysis category.',
                showAftertext: 'to learn more about all Categories',
                link: url,
              })}
              placement="left"
              interactive="true"
            >
              <IconButton
                disableRipple={true}
                disableFocusRipple={true}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <DashboardInfoOutlined />
              </IconButton>
            </TextTooltip>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BBChart options={chartOptions} />
        </div>
      </DashboardSection>
    </Link>
  );
}

export function MeshModelGraph() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <MeshModelCategories />
      </Grid>

      <Grid item xs={12} md={6}>
        <MeshModelContructs />
      </Grid>
    </Grid>
  );
}

MeshModelGraph.displayName = 'MeshModelGraph';
export default MeshModelGraph;
