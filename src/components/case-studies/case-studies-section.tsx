'use client';

import { useState } from 'react';
import { caseStudies, categoryLabels, type CaseStudy } from '@/lib/case-studies-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Quote, TrendingUp, Building2, Users, Clock } from 'lucide-react';

type FilterCategory = CaseStudy['categories'][number] | 'all';

export function CaseStudiesSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  
  const filteredStudies = activeFilter === 'all' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.categories.includes(activeFilter as CaseStudy['categories'][number]));

  const filters: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'lead-qualification', label: 'Lead Qualification' },
    { key: 'sales-automation', label: 'Sales Automation' },
    { key: 'customer-support', label: 'Customer Support' },
    { key: 'data-sync', label: 'Data Sync' },
    { key: 'it-ops', label: 'IT Operations' },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Real Results from Real Companies
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Industry Case Studies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Documented automation wins from companies using n8n, Zapier, and Make. 
            These are real results with verifiable metrics—not testimonials.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl md:text-3xl font-bold text-primary">$136M+</div>
              <div className="text-sm text-muted-foreground">Revenue Impact</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl md:text-3xl font-bold text-primary">50,000+</div>
              <div className="text-sm text-muted-foreground">Hours Saved</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl md:text-3xl font-bold text-primary">25x</div>
              <div className="text-sm text-muted-foreground">Avg Speed Gain</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl md:text-3xl font-bold text-primary">{caseStudies.length}</div>
              <div className="text-sm text-muted-foreground">Verified Cases</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {filters.map(filter => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudies.map(study => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want similar results for your business?
          </p>
          <Button size="lg">
            Get Your Free Automation Audit
          </Button>
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [expanded, setExpanded] = useState(false);

  const platformColors = {
    'n8n': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'Zapier': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    'Make': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between mb-2">
          <Badge className={platformColors[study.source.platform]}>
            {study.source.platform}
          </Badge>
          <a 
            href={study.source.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <CardTitle className="text-xl">{study.company}</CardTitle>
        <CardDescription className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            {study.industry}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {study.companySize}
          </span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {study.metrics.slice(0, 2).map((metric, idx) => (
            <div key={idx} className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-primary">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.headline}</div>
            </div>
          ))}
        </div>

        {/* Problem/Solution */}
        <div className="text-sm text-muted-foreground mb-4">
          <p className={expanded ? '' : 'line-clamp-3'}>
            <strong>Problem:</strong> {study.problem}
          </p>
          {expanded && (
            <p className="mt-2">
              <strong>Solution:</strong> {study.solution}
            </p>
          )}
        </div>

        {expanded && study.quote && (
          <blockquote className="border-l-2 border-primary pl-4 mb-4 italic text-sm">
            <Quote className="h-4 w-4 text-primary mb-1" />
            "{study.quote.text}"
            <footer className="text-xs text-muted-foreground mt-1 not-italic">
              — {study.quote.author}, {study.quote.role}
            </footer>
          </blockquote>
        )}

        {/* Tools */}
        <div className="flex flex-wrap gap-1 mb-4">
          {study.tools.slice(0, expanded ? undefined : 3).map(tool => (
            <Badge key={tool} variant="secondary" className="text-xs">
              {tool}
            </Badge>
          ))}
          {!expanded && study.tools.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{study.tools.length - 3}
            </Badge>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-4 mt-auto">
          {study.categories.map(cat => (
            <Badge key={cat} variant="outline" className="text-xs">
              {categoryLabels[cat]}
            </Badge>
          ))}
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : 'Read More'}
        </Button>
      </CardContent>
    </Card>
  );
}

// Compact version for embedding in other sections
export function CaseStudyHighlight({ studyId }: { studyId: string }) {
  const study = caseStudies.find(s => s.id === studyId);
  if (!study) return null;

  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg">
      <TrendingUp className="h-8 w-8 text-primary flex-shrink-0" />
      <div>
        <div className="font-semibold">{study.company}</div>
        <div className="text-sm text-muted-foreground">{study.industry}</div>
        <div className="flex gap-4 mt-2">
          {study.metrics.slice(0, 2).map((m, i) => (
            <div key={i}>
              <span className="font-bold text-primary">{m.value}</span>
              <span className="text-xs text-muted-foreground ml-1">{m.headline}</span>
            </div>
          ))}
        </div>
        <a 
          href={study.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline mt-2 inline-block"
        >
          View Case Study →
        </a>
      </div>
    </div>
  );
}

// Mini badge version for inline references
export function CaseStudyBadge({ studyId }: { studyId: string }) {
  const study = caseStudies.find(s => s.id === studyId);
  if (!study) return null;

  return (
    <a 
      href={study.source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full hover:bg-muted/80"
    >
      <span className="font-medium">{study.company}</span>
      <span className="text-muted-foreground">saved</span>
      <span className="font-bold text-primary">{study.metrics[0].value}</span>
    </a>
  );
}
