import { Fragment } from 'react'
import { siteConfig } from './data/siteConfig'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Work from './components/Work/Work'
import Showcase from './components/Showcase/Showcase'
import Insights from './components/Insights/Insights'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Team from './components/Team/Team'
import Footer from './components/Footer/Footer'
import SectionDivider from './components/SectionDivider/SectionDivider'

const sectionComponents = {
  services: Services,
  work: Work,
  showcase: Showcase,
  insights: Insights,
  about: About,
  contact: Contact,
  team: Team,
}

const sectionPropsMap = {
  services: siteConfig.services,
  work: siteConfig.work,
  showcase: siteConfig.showcase,
  insights: siteConfig.insights,
  about: siteConfig.about,
  contact: siteConfig.contact,
  team: siteConfig.team,
}

export default function App() {
  const enabledSections = siteConfig.sections.filter((s) => s.enabled !== false)
  const navLinks = enabledSections.filter((s) => s.id !== 'contact')
  const hasContact = enabledSections.some((s) => s.id === 'contact')

  return (
    <>
      <Navbar
        logoText={siteConfig.site.logoText}
        navLinks={navLinks}
        showContact={hasContact}
        showColorCycler={siteConfig.site.showcaseColorCycler ?? false}
        showThemeToggle={siteConfig.site.showThemeToggle ?? false}
        contactButtonText={siteConfig.navbar?.contactButtonText}
      />
      <Hero {...siteConfig.hero} />
      {enabledSections.map((section) => {
        const Component = sectionComponents[section.id]
        if (!Component) return null
        return (
          <Fragment key={section.id}>
            <SectionDivider />
            <Component {...(sectionPropsMap[section.id] || {})} />
          </Fragment>
        )
      })}
      <Footer
        logoText={siteConfig.site.logoText}
        copyright={siteConfig.footer.copyright}
        rightsText={siteConfig.footer.rightsText}
        backToTopText={siteConfig.footer.backToTopText}
        socialLinks={siteConfig.footer.socialLinks}
        navLinks={enabledSections}
      />
    </>
  )
}
