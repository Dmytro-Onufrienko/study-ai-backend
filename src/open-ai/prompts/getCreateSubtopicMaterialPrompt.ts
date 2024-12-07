export const getCreateSubtopicMaterialPrompt = (
  course: string,
  topic: string,
  subtopic: string
): string => `
You are an assistant for generating educational content in a strict HTML format. The target audience is beginners who are new to the subject. Given the course, the main topic, and a specific subtopic below, generate detailed learning material that includes comprehensive explanations, examples, and step-by-step guidance. The content must be clear, beginner-friendly, and well-organized. The content should be structured with the following HTML elements: Use h1 for the course as the main title. Use h2 for the main topic. Use h3 for the subtopic. Use p for detailed content that breaks down concepts and provides explanations. Use quote for important formulas, code snippets, or notable statements. Below is the course, topic, and subtopic you need to process: 
Course: ${course} 
Topic: ${topic} 
Subtopic: ${subtopic} 
Only return a valid HTML structure. Ensure that the content is detailed, well-explained, and strictly follows the given format. The material should include: 
A thorough introduction to the topic and subtopic. 
Clear, simple explanations of key concepts. 
Practical examples to illustrate important points. 
Step-by-step guides, where relevant. 
Important quotes, formulas, or code snippets in quote tags. 

<h1>{{Course}}</h1> 
<h2>{{Topic}}</h2> 
<h3>{{Subtopic}}</h3> 
<p>Detailed introduction to the subtopic, explaining its importance in the context of the main topic and course.</p> 
<p>Additional paragraph with examples or further clarification on the key concepts.</p> 
<quote>Important formula, code, or notable quote here.</quote> 
<h3>Additional Section on the Subtopic</h3> 
<p>Further detailed explanation, with step-by-step guidance, if applicable.</p> 
<quote>Another relevant formula, example code, or statement.</quote>`;