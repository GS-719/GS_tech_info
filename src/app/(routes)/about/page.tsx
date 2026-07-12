export default function AboutPage() {
  return (
    <>
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-balance">
            About GS Tech Info
          </h1>

          <article className="prose prose-invert max-w-none">
            <h2>Our Mission</h2>
            <p>
              GS Tech Info is dedicated to providing premium technical content for developers who want to go deeper. We believe that quality over quantity leads to better learning outcomes.
            </p>

            <h2>What We Cover</h2>
            <p>
              We focus on in-depth technical content covering:
            </p>
            <ul>
              <li>System Architecture and Design</li>
              <li>Database Design and Optimization</li>
              <li>Performance Engineering</li>
              <li>Security Best Practices</li>
              <li>Cloud and DevOps</li>
              <li>Frontend and Backend Development</li>
            </ul>

            <h2>Our Approach</h2>
            <p>
              Every article on GS Tech Info is thoroughly researched and written by experienced developers. We provide practical examples, code snippets, and real-world scenarios to ensure you can apply the knowledge immediately.
            </p>

            <h2>Join Our Community</h2>
            <p>
              We&apos;re building a community of developers passionate about learning and sharing knowledge. Whether you&apos;re a beginner looking to level up or an experienced engineer staying current, there&apos;s something for everyone.
            </p>
          </article>
        </div>
      </main>
    </>
  )
}
