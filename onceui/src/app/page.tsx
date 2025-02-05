"use client";

import React, { useState, Fragment } from "react";

import {
  Heading,
  Text,
  Button,
  Icon,
  InlineCode,
  Logo,
  Input,
  Avatar,
  AvatarGroup,
  Textarea,
  PasswordInput,
  SegmentedControl,
  SmartLink,
  Dialog,
  Feedback,
  SmartImage,
  Line,
  LogoCloud,
  Background,
  Select,
  useToast,
  Card,
  Fade,
  StatusIndicator,
  DateRangePicker,
  DateRange,
  TiltFx,
  HoloFx,
  IconButton,
  TagInput,
  Switch,
  Column,
  Row,
  StyleOverlay,
} from "@/once-ui/components";
import { CodeBlock, MediaUpload } from "@/once-ui/modules";

// EcoTrack - Environmental theme with leaf and graph
const ecoTrackSvg = `data:image/svg+xml,<svg width="300" height="169" viewBox="0 0 300 169" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="169" fill="#E8F5E9"/>
  <path d="M100 120C120 90 140 110 160 80C180 50 200 70 220 40" stroke="#4CAF50" stroke-width="4"/>
  <path d="M150 84.5C150 93.0604 143.06 100 134.5 100C125.94 100 119 93.0604 119 84.5C119 75.9396 125.94 69 134.5 69C143.06 69 150 75.9396 150 84.5Z" fill="#4CAF50"/>
  <path d="M140 60L160 80L140 100" fill="#81C784"/>
</svg>`;

// MentorMatch - Connection theme with linked nodes
const mentorMatchSvg = `data:image/svg+xml,<svg width="300" height="169" viewBox="0 0 300 169" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="169" fill="#E3F2FD"/>
  <circle cx="100" cy="84" r="20" fill="#2196F3"/>
  <circle cx="200" cy="84" r="20" fill="#1976D2"/>
  <path d="M120 84H180" stroke="#90CAF9" stroke-width="4"/>
  <circle cx="150" cy="84" r="5" fill="#90CAF9"/>
</svg>`;

// HealthBridge - Medical theme with heart rate
const healthBridgeSvg = `data:image/svg+xml,<svg width="300" height="169" viewBox="0 0 300 169" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="169" fill="#FCE4EC"/>
  <path d="M60 84H120L130 64L150 104L170 44L190 84H240" stroke="#E91E63" stroke-width="4"/>
  <path d="M150 50C160 40 170 40 180 50C190 60 190 70 180 80L150 110L120 80C110 70 110 60 120 50C130 40 140 40 150 50Z" fill="#FF4081"/>
</svg>`;

// EduAccess - Education theme with book and graduation cap
const eduAccessSvg = `data:image/svg+xml,<svg width="300" height="169" viewBox="0 0 300 169" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="169" fill="#EDE7F6"/>
  <path d="M100 60H200V120H100V60Z" fill="#673AB7"/>
  <path d="M90 60L150 40L210 60L150 80L90 60Z" fill="#9575CD"/>
  <path d="M140 100H160V110H140V100Z" fill="#D1C4E9"/>
</svg>`;

// CommunityConnect - Community theme with connected people
const communityConnectSvg = `data:image/svg+xml,<svg width="300" height="169" viewBox="0 0 300 169" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="169" fill="#FFF3E0"/>
  <circle cx="150" cy="84" r="30" fill="#FF9800"/>
  <circle cx="100" cy="84" r="20" fill="#F57C00"/>
  <circle cx="200" cy="84" r="20" fill="#F57C00"/>
  <path d="M120 84H180" stroke="#FFB74D" stroke-width="4"/>
</svg>`;

// GreenCity - Smart city theme with buildings and green elements
const greenCitySvg = `data:image/svg+xml,<svg width="300" height="169" viewBox="0 0 300 169" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="169" fill="#E0F2F1"/>
  <rect x="80" y="60" width="40" height="80" fill="#009688"/>
  <rect x="130" y="40" width="40" height="100" fill="#00796B"/>
  <rect x="180" y="70" width="40" height="70" fill="#009688"/>
  <circle cx="100" cy="40" r="15" fill="#4DB6AC"/>
  <circle cx="200" cy="50" r="15" fill="#4DB6AC"/>
</svg>`;

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedRange, setSelectedRange] = useState<DateRange>();
  const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [firstDialogHeight, setFirstDialogHeight] = useState<number>();
  const { addToast } = useToast();
  const [intro, setIntro] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tags, setTags] = useState<string[]>(["UX / UI", "Design systems", "AI / ML"]);
  const [twoFA, setTwoFA] = useState(false);

  const handleSelect = (value: string) => {
    console.log("Selected option:", value);
    setSelectedValue(value);
  };

  const links = [
    {
      href: "https://once-ui.com/docs/theming",
      title: "Themes",
      description: "Style your app in minutes",
    },
    {
      href: "https://once-ui.com/docs/RowComponent",
      title: "Layout",
      description: "Build responsive layouts",
    },
    {
      href: "https://once-ui.com/docs/typography",
      title: "Typography",
      description: "Scale text automatically",
    },
  ];

  const validateIntro = (value: React.ReactNode) => {
    if (typeof value === "string" && value.length < 10) {
      return (
        <Row horizontal="center" marginBottom="12" gap="8">
          <Icon name="errorCircle" />
          Intro must be at least 10 characters long.
        </Row>
      );
    }
    return null;
  };

  const validateLogin = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return "Email and / or password is invalid.";
    }
    return null;
  };

  const handleHeightChange = (height: number): void => {
    setFirstDialogHeight(height);
  };

  return (
    <Column fillWidth paddingY="80" paddingX="s" horizontal="center" flex={1}>
      <Fade
        zIndex={3}
        pattern={{
          display: true,
          size: "4",
        }}
        position="fixed"
        top="0"
        left="0"
        to="bottom"
        height={5}
        fillWidth
        blur={0.25}
      />
      <Row position="fixed" top="0" fillWidth horizontal="center" zIndex={3}>
        <Row
          data-border="rounded"
          horizontal="space-between"
          maxWidth="l"
          paddingRight="64"
          paddingLeft="32"
          paddingY="20"
        >
          <Logo size="m" icon={false} href="https://once-ui.com" />
          <Row gap="12" hide="s">
            <Button
              href="https://discord.com/invite/5EyAQ4eNdS"
              prefixIcon="discord"
              size="s"
              label="Discord"
              weight="default"
              variant="tertiary"
            />
            <Button
              href="https://github.com/once-ui-system/nextjs-starter"
              prefixIcon="github"
              size="s"
              label="GitHub"
              weight="default"
              variant="tertiary"
            />
            <StyleOverlay top="20" right="24" />
          </Row>
          <Row gap="16" show="s" horizontal="center" paddingRight="24">
            <IconButton
              href="https://discord.com/invite/5EyAQ4eNdS"
              icon="discord"
              variant="tertiary"
            />
            <IconButton
              href="https://github.com/once-ui-system/nextjs-starter"
              icon="github"
              variant="tertiary"
            />
            <StyleOverlay top="20" right="24" />
          </Row>
        </Row>
      </Row>
      <Column
        overflow="hidden"
        as="main"
        maxWidth="l"
        position="relative"
        radius="xl"
        horizontal="center"
        border="neutral-alpha-weak"
        fillWidth
      >
        <Column
          fillWidth
          horizontal="center"
          gap="48"
          radius="xl"
          paddingTop="80"
          position="relative"
        >
          <Background
            mask={{
              x: 0,
              y: 48,
            }}
            position="absolute"
            grid={{
              display: true,
              width: "0.25rem",
              color: "neutral-alpha-medium",
              height: "0.25rem",
            }}
          />
          <Background
            mask={{
              x: 80,
              y: 0,
              radius: 100,
            }}
            position="absolute"
            gradient={{
              display: true,
              tilt: -35,
              height: 50,
              width: 75,
              x: 100,
              y: 40,
              colorStart: "accent-solid-medium",
              colorEnd: "static-transparent",
            }}
          />
          <Background
            mask={{
              x: 100,
              y: 0,
              radius: 100,
            }}
            position="absolute"
            gradient={{
              display: true,
              opacity: 100,
              tilt: -35,
              height: 20,
              width: 120,
              x: 120,
              y: 35,
              colorStart: "brand-solid-strong",
              colorEnd: "static-transparent",
            }}
          />
          <Column fillWidth horizontal="center" gap="32" padding="32" position="relative">
            <InlineCode radius="xl" shadow="m" fit paddingX="16" paddingY="8">
              Join our community
              <Text onBackground="brand-medium" marginLeft="8">
                Start coding today
              </Text>
            </InlineCode>
            
            <Heading 
              wrap="balance" 
              variant="display-default-l" 
              align="center" 
              marginBottom="16"
            >
              Empowering the Next Generation of Coders and Innovators
            </Heading>

            <Text 
              align="center" 
              variant="body-default-l" 
              onBackground="neutral-medium"
              style={{ maxWidth: '36rem' }}
              marginBottom="32"
            >
              Deta is a non-profit, community-driven initiative dedicated to helping students and 
              professionals learn coding, develop digital skills, and create applications that solve 
              real-world problems.
            </Text>

            <Row gap="16">
              <Button
                label="Join the Community"
                variant="primary"
                size="l"
                arrowIcon
              />
              <Button
                label="Explore Projects" 
                variant="secondary"
                size="l"
              />
              <Button
                label="Learn to Code"
                variant="secondary" 
                size="l"
              />
            </Row>

            {/* Why Deta Section */}
            <Column horizontal="center" paddingTop="104" fillWidth gap="48">
              <Heading as="h2" variant="display-default-m" align="center">
                Why Deta?
              </Heading>
              
              <Row wrap={true} gap="32" fillWidth>
                <Card padding="32" fillWidth>
                  <Column gap="16">
                    <Icon name="gift" size="l" />
                    <Heading as="h3" variant="heading-default-m">
                      Free and Accessible
                    </Heading>
                    <Text onBackground="neutral-medium">
                      Everyone deserves the opportunity to learn coding, regardless of background.
                    </Text>
                  </Column>
                </Card>

                <Card padding="32" fillWidth>
                  <Column gap="16">
                    <Icon name="users" size="l" />
                    <Heading as="h3" variant="heading-default-m">
                      Community-Powered
                    </Heading>
                    <Text onBackground="neutral-medium">
                      Learn and grow with a supportive network of peers and mentors.
                    </Text>
                  </Column>
                </Card>

                <Card padding="32" fillWidth>
                  <Column gap="16">
                    <Icon name="target" size="l" />
                    <Heading as="h3" variant="heading-default-m">
                      Real-World Impact
                    </Heading>
                    <Text onBackground="neutral-medium">
                      Build applications that address social, environmental, and community challenges.
                    </Text>
                  </Column>
                </Card>
              </Row>
            </Column>

            {/* Impact Statistics Section */}
            <Column 
              horizontal="center" 
              paddingTop="104" 
              fillWidth 
              gap="64"
              background="surface"
              padding="80"
              border="neutral-alpha-weak"
              radius="xl"
              position="relative"
            >
              <Background
                mask={{
                  x: 0,
                  y: 0,
                  radius: 100,
                }}
                position="absolute"
                gradient={{
                  display: true,
                  tilt: -35,
                  height: 50,
                  width: 75,
                  x: 80,
                  y: 20,
                  colorStart: "brand-solid-medium",
                  colorEnd: "static-transparent",
                  opacity: 20
                }}
              />

              <Column gap="24" horizontal="center">
                <InlineCode radius="xl" shadow="m" fit paddingX="16" paddingY="8">
                  Our Growth
                  <Text onBackground="brand-medium" marginLeft="8">
                    2023 Impact Report
                  </Text>
                </InlineCode>
                
                <Heading as="h2" variant="display-default-l" align="center">
                  Making a Real Difference
                </Heading>
                
                <Text 
                  align="center" 
                  variant="body-default-l" 
                  onBackground="neutral-medium"
                  style={{ maxWidth: '36rem' }}
                  marginBottom="32"
                >
                  Through collaboration and dedication, we're building a more inclusive tech community.
                </Text>
              </Column>

              <Row wrap={true} gap="32" fillWidth horizontal="center" maxWidth="xl">
                <Card 
                  padding="48" 
                  background="surface"
                  style={{ 
                    flex: '1 1 calc(25% - 24px)', 
                    minWidth: '240px',
                    transition: 'box-shadow 0.2s ease-in-out'
                  }}
                  className="hover:shadow-lg"
                >
                  <Column gap="24" horizontal="center">
                    <Icon 
                      name="users" 
                      size="xl" 
                      onBackground="brand-strong"
                    />
                    <Column gap="8" horizontal="center">
                      <Heading 
                        as="h3"
                        variant="display-default-xl" 
                        align="center"
                        onBackground="brand-strong"
                      >
                        10,000+
                      </Heading>
                      <Text 
                        align="center" 
                        variant="body-strong-m"
                      >
                        Active Learners
                      </Text>
                      <Text 
                        align="center" 
                        variant="body-default-s" 
                        onBackground="neutral-medium"
                      >
                        From 50+ countries worldwide
                      </Text>
                    </Column>
                  </Column>
                </Card>

                <Card 
                  padding="48" 
                  background="surface"
                  style={{ 
                    flex: '1 1 calc(25% - 24px)', 
                    minWidth: '240px',
                    transition: 'box-shadow 0.2s ease-in-out'
                  }}
                  className="hover:shadow-lg"
                >
                  <Column gap="24" horizontal="center">
                    <Icon 
                      name="code" 
                      size="xl" 
                      onBackground="brand-strong"
                    />
                    <Column gap="8" horizontal="center">
                      <Heading 
                        as="h3" 
                        variant="display-default-xl" 
                        align="center"
                        onBackground="brand-strong"
                      >
                        500+
                      </Heading>
                      <Text 
                        align="center" 
                        variant="body-strong-m"
                      >
                        Projects Launched
                      </Text>
                      <Text 
                        align="center" 
                        variant="body-default-s" 
                        onBackground="neutral-medium"
                      >
                        Making real-world impact
                      </Text>
                    </Column>
                  </Column>
                </Card>

                <Card 
                  padding="48" 
                  background="surface"
                  style={{ 
                    flex: '1 1 calc(25% - 24px)', 
                    minWidth: '240px',
                    transition: 'box-shadow 0.2s ease-in-out'
                  }}
                  className="hover:shadow-lg"
                >
                  <Column gap="24" horizontal="center">
                    <Icon 
                      name="target" 
                      size="xl" 
                      onBackground="brand-strong"
                    />
                    <Column gap="8" horizontal="center">
                      <Heading 
                        as="h3" 
                        variant="display-default-xl" 
                        align="center"
                        onBackground="brand-strong"
                      >
                        25
                      </Heading>
                      <Text 
                        align="center" 
                        variant="body-strong-m"
                      >
                        Community Events
                      </Text>
                      <Text 
                        align="center" 
                        variant="body-default-s" 
                        onBackground="neutral-medium"
                      >
                        Hackathons & workshops
                      </Text>
                    </Column>
                  </Column>
                </Card>

                <Card 
                  padding="48" 
                  background="surface"
                  style={{ 
                    flex: '1 1 calc(25% - 24px)', 
                    minWidth: '240px',
                    transition: 'box-shadow 0.2s ease-in-out'
                  }}
                  className="hover:shadow-lg"
                >
                  <Column gap="24" horizontal="center">
                    <Icon 
                      name="handshake" 
                      size="xl" 
                      onBackground="brand-strong"
                    />
                    <Column gap="8" horizontal="center">
                      <Heading 
                        as="h3" 
                        variant="display-default-xl" 
                        align="center"
                        onBackground="brand-strong"
                      >
                        15
                      </Heading>
                      <Text 
                        align="center" 
                        variant="body-strong-m"
                      >
                        Partners
                      </Text>
                      <Text 
                        align="center" 
                        variant="body-default-s" 
                        onBackground="neutral-medium"
                      >
                        Industry collaborations
                      </Text>
                    </Column>
                  </Column>
                </Card>
              </Row>
            </Column>

            {/* Project Categories Section */}
            <Column 
              horizontal="center" 
              paddingTop="104" 
              fillWidth 
              gap="64"
              padding="80"
              radius="xl"
              position="relative"
            >
              <Background
                mask={{
                  x: 0,
                  y: 0,
                }}
                position="absolute"
                gradient={{
                  display: true,
                  tilt: -35,
                  height: 100,
                  width: 100,
                  x: 80,
                  y: 20,
                  colorStart: "brand-solid-medium",
                  colorEnd: "static-transparent",
                  opacity: 10
                }}
              />

              <Column gap="24" horizontal="center">
                <InlineCode radius="xl" shadow="m" fit paddingX="16" paddingY="8">
                  Explore
                  <Text onBackground="brand-medium" marginLeft="8">
                    Project Categories
                  </Text>
                </InlineCode>
                <Heading as="h2" variant="display-default-l" align="center">
                  Find Your Perfect Project
                </Heading>
                <Text 
                  align="center" 
                  variant="body-default-l" 
                  onBackground="neutral-medium"
                  style={{ maxWidth: '32rem' }}
                >
                  Discover projects aligned with your interests and make a real impact in areas you care about.
                </Text>
              </Column>

              <Row wrap={true} gap="24" fillWidth maxWidth="xl" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                width: '100%'
              }}>
                {[
                  {
                    icon: "book",
                    title: "Education",
                    description: "Build tools and platforms that transform how people learn and teach.",
                    color: "brand-strong",
                    projects: 125,
                    contributors: 450
                  },
                  {
                    icon: "heart",
                    title: "Healthcare",
                    description: "Create solutions that improve access to quality healthcare services.",
                    color: "success-strong",
                    projects: 98,
                    contributors: 380
                  },
                  {
                    icon: "leaf",
                    title: "Sustainability",
                    description: "Develop apps that promote environmental conservation and green living.",
                    color: "warning-strong",
                    projects: 84,
                    contributors: 320
                  },
                  {
                    icon: "users",
                    title: "Community",
                    description: "Build platforms that strengthen local communities and social connections.",
                    color: "info-strong",
                    projects: 112,
                    contributors: 410
                  }
                ].map((category, index) => (
                  <Card 
                    key={index}
                    padding="40" 
                    background="surface"
                    border="neutral-alpha-weak"
                    radius="xl"
                    style={{ 
                      height: '100%',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    className="hover:shadow-xl hover:-translate-y-2"
                  >
                    <Column gap="32" style={{ height: '100%' }}>
                      <Row horizontal="space-between" vertical="center">
                        <Column 
                          padding="16"
                          radius="l"
                          background="surface"
                          style={{ width: 'fit-content' }}
                        >
                          <Icon 
                            name={category.icon} 
                            size="xl" 
                            color={category.color}
                          />
                        </Column>
                        <Button 
                          variant="tertiary" 
                          label="Explore" 
                          arrowIcon 
                          size="s"
                        />
                      </Row>
                      <Column gap="16" style={{ flex: 1, justifyContent: 'space-between' }}>
                        <Column gap="8">
                          <Heading as="h3" variant="heading-default-l">
                            {category.title}
                          </Heading>
                          <Text 
                            variant="body-default-l"
                            onBackground="neutral-medium"
                          >
                            {category.description}
                          </Text>
                        </Column>
                        <Row gap="24" marginTop="8">
                          <Column gap="4">
                            <Text variant="body-strong-m">
                              {category.projects}+
                            </Text>
                            <Text 
                              variant="body-default-s"
                              onBackground="neutral-medium"
                            >
                              Active Projects
                            </Text>
                          </Column>
                          <Column gap="4">
                            <Text variant="body-strong-m">
                              {category.contributors}+
                            </Text>
                            <Text 
                              variant="body-default-s"
                              onBackground="neutral-medium"
                            >
                              Contributors
                            </Text>
                          </Column>
                        </Row>
                      </Column>
                    </Column>
                  </Card>
                ))}
              </Row>
            </Column>

            {/* Featured Projects Section */}
            <Column horizontal="center" paddingTop="104" fillWidth gap="48">
              <Column gap="24" horizontal="center">
                <Heading as="h2" variant="display-default-l" align="center">
                  Featured Projects
                </Heading>
                <Text 
                  align="center" 
                  variant="body-default-l" 
                  onBackground="neutral-medium"
                  style={{ maxWidth: '36rem' }}
                >
                  Explore some of our community's most impactful projects
                </Text>
              </Column>

              <Row 
                wrap={true} 
                gap="24" 
                fillWidth 
                maxWidth="xl"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                  width: '100%'
                }}
              >
                {[
                  {
                    title: "EcoTrack",
                    status: "active",
                    image: "/images/profile.jpg",
                    description: "A sustainability tracking app helping communities monitor and reduce their carbon footprint.",
                    tech: ["React Native", "GraphQL", "AWS"],
                    team: [
                      { title: "Maya Patel", initials: "MP", color: "#4F46E5" },
                      { title: "Chris Lee", initials: "CL", color: "#0EA5E9" },
                      { title: "Zoe Chen", initials: "ZC", color: "#10B981" }
                    ]
                  },
                  {
                    title: "MentorMatch",
                    status: "development",
                    image: "/images/profile.jpg",
                    description: "AI-powered platform connecting aspiring developers with experienced mentors.",
                    tech: ["Next.js", "OpenAI", "MongoDB"],
                    team: [
                      { title: "Alex Kim", initials: "AK", color: "#8B5CF6" },
                      { title: "Sarah Chen", initials: "SC", color: "#EC4899" }
                    ]
                  },
                  {
                    title: "HealthBridge",
                    status: "active",
                    image: "/images/profile.jpg",
                    description: "Telemedicine solution for underserved communities with translation tools.",
                    tech: ["Flutter", "Firebase", "TensorFlow"],
                    team: [
                      { title: "Dr. Rodriguez", initials: "DR", color: "#F59E0B" },
                      { title: "Emma Liu", initials: "EL", color: "#6366F1" },
                      { title: "James Park", initials: "JP", color: "#14B8A6" }
                    ]
                  },
                  {
                    title: "EduAccess",
                    status: "active",
                    image: "/images/profile.jpg",
                    description: "Open-source learning platform making quality education accessible to rural communities.",
                    tech: ["Vue.js", "Node.js", "PostgreSQL"],
                    team: [
                      { title: "David Wang", initials: "DW", color: "#8B5CF6" },
                      { title: "Lisa Cooper", initials: "LC", color: "#EC4899" },
                      { title: "Raj Patel", initials: "RP", color: "#F59E0B" }
                    ]
                  },
                  {
                    title: "CommunityConnect",
                    status: "development",
                    image: "/images/profile.jpg",
                    description: "Local volunteer matching platform connecting helpers with community needs.",
                    tech: ["React", "Express", "Socket.io"],
                    team: [
                      { title: "Maria Garcia", initials: "MG", color: "#10B981" },
                      { title: "Tom Wilson", initials: "TW", color: "#6366F1" },
                      { title: "Nina Shah", initials: "NS", color: "#14B8A6" }
                    ]
                  },
                  {
                    title: "GreenCity",
                    status: "active",
                    image: "/images/profile.jpg",
                    description: "Smart city initiative for monitoring and optimizing urban environmental impact.",
                    tech: ["Python", "Django", "IoT"],
                    team: [
                      { title: "Kevin Zhang", initials: "KZ", color: "#4F46E5" },
                      { title: "Anna Brown", initials: "AB", color: "#0EA5E9" },
                      { title: "Mike Johnson", initials: "MJ", color: "#EC4899" }
                    ]
                  }
                ].map((project, index) => (
                  <Card 
                    key={index}
                    padding="0" 
                    background="surface"
                    radius="xl"
                    style={{ 
                      transition: 'all 0.3s ease',
                      transform: 'translateY(0)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      maxWidth: '300px',
                      margin: '0 auto'
                    }}
                    className="hover:shadow-xl hover:-translate-y-2"
                  >
                    <Column style={{ height: '100%' }}>
                      <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                        <SmartImage
                          src={project.image}
                          alt={project.title}
                          width={300}
                          height={169}
                          isLoading={false}
                          style={{ 
                            borderRadius: '24px 24px 0 0',
                            transition: 'transform 0.3s ease',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          className="hover:scale-105"
                        />
                      </div>
                      <Column 
                        padding="24" 
                        gap="12" 
                        style={{ 
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Column gap="16">
                          <Row 
                            gap="8" 
                            vertical="center" 
                            background={project.status === 'active' ? 'success-weak' : 'warning-weak'}
                            padding="8"
                            radius="full"
                            style={{ width: 'fit-content' }}
                          >
                            <Icon 
                              name={project.status === 'active' ? 'checkCircle' : 'alertTriangle'} 
                              size="s" 
                              color={project.status === 'active' ? 'success' : 'warning'} 
                            />
                            <Text variant="body-strong-s" style={{ whiteSpace: 'nowrap' }}>
                              {project.status === 'active' ? 'Active Project' : 'In Development'}
                            </Text>
                          </Row>
                          <Heading 
                            as="h3" 
                            variant="heading-default-m"
                            style={{ 
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              lineHeight: '1.3'
                            }}
                          >
                            {project.title}
                          </Heading>
                          <Text 
                            onBackground="neutral-medium"
                            style={{ 
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              lineHeight: '1.5'
                            }}
                          >
                            {project.description}
                          </Text>
                        </Column>
                        
                        <Column gap="16">
                          <Row 
                            gap="8" 
                            wrap={true}
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '8px'
                            }}
                          >
                            {project.tech.map((tech, i) => (
                              <InlineCode 
                                key={i}
                                style={{
                                  whiteSpace: 'nowrap',
                                  fontSize: '0.875rem'
                                }}
                              >
                                {tech}
                              </InlineCode>
                            ))}
                          </Row>
                          <Row 
                            horizontal="space-between" 
                            vertical="center"
                            style={{
                              marginTop: 'auto',
                              width: '100%'
                            }}
                          >
                            <AvatarGroup 
                              size="s" 
                              limit={3}
                              avatars={project.team.map(member => ({
                                value: member.initials,
                                style: {
                                  backgroundColor: member.color,
                                  color: '#FFFFFF'
                                }
                              }))}
                            />
                            <Button 
                              variant="tertiary" 
                              label="View Project"
                              aria-label={`View ${project.title} details`}
                              arrowIcon 
                              size="s"
                            />
                          </Row>
                        </Column>
                      </Column>
                    </Column>
                  </Card>
                ))}
              </Row>
            </Column>

            {/* Testimonials Section */}
            <Column horizontal="center" paddingTop="104" fillWidth gap="48">
              <Heading as="h2" variant="display-default-m" align="center">
                What Our Community Says
              </Heading>

              <Row wrap={true} gap="32" fillWidth>
                <Card padding="32" fillWidth>
                  <Column gap="16">
                    <Text onBackground="neutral-medium" style={{ fontStyle: 'italic' }}>
                      "Deta gave me the skills and confidence to build my first app. The community support was incredible!"
                    </Text>
                    <Text variant="body-strong-m">Sarah T.</Text>
                    <Text variant="body-default-s" onBackground="neutral-medium">Student</Text>
                  </Column>
                </Card>

                <Card padding="32" fillWidth>
                  <Column gap="16">
                    <Text onBackground="neutral-medium" style={{ fontStyle: 'italic' }}>
                      "I transitioned into a tech career thanks to Deta's resources and mentorship programs."
                    </Text>
                    <Text variant="body-strong-m">James L.</Text>
                    <Text variant="body-default-s" onBackground="neutral-medium">Software Developer</Text>
                  </Column>
                </Card>
              </Row>
            </Column>

            {/* Newsletter Section */}
            <Column horizontal="center" paddingTop="104" fillWidth gap="32">
              <Heading as="h2" variant="display-default-m" align="center">
                Stay Connected
              </Heading>
              
              <Text align="center" onBackground="neutral-medium" marginBottom="32">
                Get the latest updates, resources, and event invites delivered to your inbox.
              </Text>

              <Row gap="32" fillWidth wrap={true} style={{ maxWidth: '32rem' }}>
                <Input
                  id="newsletter"
                  label="Email"
                  placeholder=""
                  type="email"
                  size={1}
                  width="full"
                  aria-label="Email newsletter signup"
                />
                <Button 
                  label="Subscribe" 
                  size="l"
                />
              </Row>

              <Row gap="16" marginTop="32">
                <IconButton
                  href="https://twitter.com"
                  icon="twitter"
                  variant="tertiary"
                  tooltip="Twitter"
                />
                <IconButton
                  href="https://linkedin.com"
                  icon="linkedin"
                  variant="tertiary"
                  tooltip="LinkedIn"
                />
                <IconButton
                  href="https://github.com"
                  icon="github"
                  variant="tertiary"
                  tooltip="GitHub"
                />
              </Row>
            </Column>
          </Column>
        </Column>
      </Column>

      <Dialog
        isOpen={isFirstDialogOpen}
        onClose={() => setIsFirstDialogOpen(false)}
        title="Account details"
        description="Manage your security settings and password."
        base={isSecondDialogOpen}
        onHeightChange={handleHeightChange}
        footer={
          <Fragment>
            <Button variant="secondary" onClick={() => setIsFirstDialogOpen(false)}>
              Close
            </Button>
          </Fragment>
        }
      >
        <Column paddingTop="24" fillWidth gap="24">
          <Switch
            reverse
            isChecked={twoFA}
            onToggle={() => setTwoFA(!twoFA)}
            label="2FA"
            description="Enable two factor authentication"
          />
          <Button onClick={() => setIsSecondDialogOpen(true)}>Change password</Button>
        </Column>
      </Dialog>
      <Dialog
        isOpen={isSecondDialogOpen}
        onClose={() => setIsSecondDialogOpen(false)}
        title="Change password"
        stack
        description="Choose a new password for your account."
        minHeight={firstDialogHeight}
        footer={
          <React.Fragment>
            <Button variant="secondary" onClick={() => setIsSecondDialogOpen(false)}>
              Close
            </Button>
            <Button 
              label="Save"
              onClick={() => setIsSecondDialogOpen(false)} 
            />
          </React.Fragment>
        }
      >
        <PasswordInput id="resetPassword" label="New password" />
      </Dialog>
    </Column>
  );
}
