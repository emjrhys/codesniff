import React, { PropTypes, Component } from 'react'

class Info extends Component {
    render() {
        return (
            <div className="component-info">
                <h1>What is CodeSniff</h1>
                <div>                  
                    <p>
                        CodeSniff is an interactive web application that lets users analyze snippets of code for code smells. 
                        We hope that this practice will help users avoid creating these code smells in their own programs. 
                    </p>
                    <h2>What Is a Code Smell?</h2> 
                    <p>
                        According to Wikipedia, a code smell is "any symptom in the source code of a program that possibly indicates a deeper problem". 
                        Code smells tend to be patterns that commonly show up in source code that when fixed, often lead to better, more maintainable, reh3able, and cleaner code.
                    </p>
                    <h2>List of Code Smells</h2>
                    <div id="smells">
                        <h3>Duplicate Code</h3>
                        <p>When segments of source code are repeated throughout the program. This include:</p>
                        <ul>
                            <li>Duplicate methods in superclass </li>
                            <li>Duplicate expressions in superclass </li>
                            <li>Duplicate expressions in different classes</li>
                        </ul>
                        <h3>Long Methods/Functions</h3>
                        <p>When methods or functions are excessively long. This includes:</p>
                        <ul>
                            <li>Code that will not fit on a page</li>
                            <li>Code that will not fit on a page</li>
                        </ul>                       
                        <h3>Large Classes</h3>
                        <p>Any class with more than 6­8 functions and 12­14 variables</p>
                        <h3>Long Parameter List</h3>
                        <p>When a function or method has too many parameters (generally more than 3­-4)</p>
                        <h3>Message Chain</h3>
                        <p>When you call several functions successively</p>
                        <p>Example:</p>
                        <div className="code">
                            <p>person.getAddress().getZip();</p>
                        </div>
                        <h3>Feature Envy</h3>
                        <p>When code wants to be in a different class</p>
                        <p>Example:</p>
                        <div className="code">
                            <p>csDept.getFaculty().add(newProfessor);</p>
                            <p>csDept.setFacultyCount(csDept.getFacultyCount()+1);</p>                           
                        </div>
                        <p>Should be:</p>
                        <div className="code">
                            <p>csDept.addFaculty(newProfessor);</p>
                        </div>
                        <h3>Switch Statements, Nested Ifs</h3>
                        <p>The use of switch statements where unnecessary, when if statements are deeply nested (more than 2 deep)</p>
                        <h3>Temporary fields</h3>
                        <p>When instance variables are only used for part of the lifetime of an object</p>
                        <h3>Refused bequest</h3>
                        <p>A is subclass of B, A overrides methods of B, does not use some inherited methods and fields of B</p>
                        <h3>Too many bugs</h3>
                        <p>When functionality of your assignment suffers due to too many bugs in the code</p>
                        <h3>Too hard to understand</h3>
                        <p>When your source code is not easily understood when read by someone reading it for the first time</p>
                        <h3>Too hard to change</h3>
                        <p>When your code becomes too hard to change when one of its specifications changes. Examples include:</p>
                        <ul>
                            <li>A change in input format</li>
                            <li>A change in output format</li>
                            <li>A change in internal data structures</li>
                            <li>A change in communications format/protocol</li>
                        </ul>
                    </div>
                    <h2>How Does CodeSniff Work?</h2>
                    <p>
                        When you upload a piece of code, you can highlight lines that contain code smells and label the line with the type of code smell. 
                        Once the code is uploaded, a sharing link is generated so that other users can practice identifying code smells on your code. 
                        When other users review your code and submit the code smells they have identified, a score is calculated comparing their code smells to your solution. 
                        Hopefully this motivates users to keep practicing on other code snippets to help improve their scores.
                    </p>
                </div>
            </div>
        )
    }
}

export default Info
