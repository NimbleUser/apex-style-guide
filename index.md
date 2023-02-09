---
layout: page
permalink: /
title:  "The Guide"
---

<div id="table-of-contents"></div>

## 1 - Introduction

This document serves as the **complete** definition of NimbleUser's coding standards for source code in the [Apex Programming Language](https://developer.salesforce.com/page/Apex_Code:_The_World's_First_On-Demand_Programming_Language). An Apex source file is described as being _in NimbleUser Style_ if and only if it adheres to the rules herein.

Like other programming style guides, the issues covered span not only aesthetic issues of formatting, but other types of conventions or coding standards as well. However, this document focuses primarily on the **hard-and-fast rules** that we follow universally, and avoids giving _advice_ that isn't clearly enforceable (whether by human or tool).

This is a fork of the [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html), adapted and ported to the Apex Programming Language by [Craig Ceremuga](https://github.com/cceremuga) with the immensely helpful input and feedback of the entire NimbleUser technical consulting and engineering staff.

Collaborators are welcome and the Markdown source code can be found on the [NimbleUser GitHub organization](https://github.com/NimbleUser/apex-style-guide/).

### 1.1 - Terminology notes

In this document, unless otherwise clarified:

1. The term _class_ is used inclusively to mean an "ordinary" class, enum class, interface or annotation type (`@interface`).
2. The term _member_ (of a class) is used inclusively to mean a nested class, field, method, _or constructor_; that is, all top-level contents of a class except initializers and comments.
3. The term _comment_ always refers to _implementation_ comments. We do not use the phrase "documentation comments", instead using the common term "ApexDoc."

Other "terminology notes" will appear occasionally throughout the document.

### 1.2 - Guide notes

Example code in this document is **non-normative**. That is, while the examples are in NimbleUser Style, they may not illustrate the _only_ stylish way to represent the code. Optional formatting choices made in examples should not be enforced as rules.

## 2 - Source file basics

### 2.1 - File name

The source file name consists of the case-sensitive name of the top-level class it contains (of which there is **exactly one**), plus the `.cls` extension.

See also section 5.2.1 for Apex Class naming.

### 2.2 - File encoding: UTF-8

Source files are encoded in **UTF-8**.

#### 2.3.1 - Whitespace characters

Aside from the line terminator sequence, the **ASCII horizontal space character** (**0x20**) is the only whitespace character that appears anywhere in a source file. This implies that:

1. All other whitespace characters in string and character literals are escaped.
2. Tab characters are **not** used for indentation.

### 2.3.2 - String class escape methods

The [Apex String class](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_string.htm) defines several escape* methods that can be used to include special characters in strings.

#### 2.3.3 - SOQL quoted string escape sequence

SOQL defines [several escape sequences](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_quotedstringescapes.htm) that are valid in queries so that you can include special characters in your queries.

## 3 - Source file structure

A source file consists of, **in order**:

1. Top level ApexDoc comments
2. Class declaration

**No blank lines** separate each section that is present.

### 3.1 - Top level ApexDoc comments

Each top-level `global` or `public` class starts with an ApexDoc on the first line, containing a high level description of its purpose.

See section 7 for more about ApexDoc.

### 3.2 - Class declaration

#### 3.2.1 - Exactly one top-level class declaration

Each top-level class resides in a source file of its own.

#### 3.2.2 - Ordering of class contents

The order you choose for the members and initializers of your class can have a great effect on learnability. However, there's no single correct recipe for how to do it; different classes may order their contents in different ways.

What is important is that each class uses **_some_ logical order**, which its maintainer could explain if asked. For example, new methods are not just habitually added to the end of the class, as that would yield "chronological by date added" ordering, which is not a logical ordering.

##### 3.2.2.1 - Overloads: never split

When a class has multiple constructors, or multiple methods with the same name, these appear sequentially, with no other code in between (not even private members).

## 4 - Formatting

**Terminology Note:** _block-like construct_ refers to the body of a class, method or constructor. Note that, by Section 4.8.3.1 on list initializers, any list initializer _may_ optionally be treated as if it were a block-like construct.

### 4.1 - Braces

#### 4.1.1 - Braces are used where optional

Braces are used with `if`, `else`, `for`, `do` and `while` statements, even when the body is empty or contains only a single statement.

[Apex properties](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_properties.htm) may be written like:

    public Integer MyReadOnlyProp { get; }
    public Double MyReadWriteProp { get; set; }
    public String MyWriteOnlyProp { set; }

#### 4.1.2 Nonempty blocks: K & R style

Braces follow the Kernighan and Ritchie style ("[Egyptian brackets](http://www.codinghorror.com/blog/2012/07/new-programming-jargon.html)") for _nonempty_ blocks and block-like constructs:

* No line break before the opening brace.
* Line break after the opening brace.
* Line break before the closing brace.
* Line break after the closing brace, _only if_ that brace terminates a statement or terminates the body of a method, constructor, or _named_ class. For example, there is _no_ line break after the brace if it is followed by `else` or a comma.

Examples:

    private void exampleMethod() {
        if (getSomeValue()) {
            callToSomeMethod();
        } else {
            callToAnotherMethod();
        }    
    }

See section 4.6.2 for horizontal whitespace style.

#### 4.1.3 - Empty blocks: may be concise

An empty block or block-like construct may be in K & R style (as described in Section 4.1.2). Alternatively, it may be closed immediately after it is opened, with no characters or line break in between (`{}`), **unless** it is part of a _multi-block statement_ (one that directly contains multiple blocks: `if/else` or `try/catch/finally`).

Examples:

    // This is acceptable
    public void doNothing() {}

    // This is equally acceptable
    public void doNothingElse() {
    }

    // This is not acceptable: No concise empty blocks in a multi-block statement
    try {
      doSomething();
    } catch (Exception e) {}

### 4.2 - Block indentation: +4 spaces

Each time a new block or block-like construct is opened, the indent increases by two spaces. When the block ends, the indent returns to the previous indent level. The indent level applies to both code and comments throughout the block. (See the example in Section 4.1.2, Nonempty blocks: K & R Style.)

### 4.3 - One statement per line

Each statement is followed by a line break.

### 4.4 - Column limit: 120

Apex code has a column limit of 120 characters. Except as noted below, any line that would exceed this limit must be line-wrapped, as explained in Section 4.5, Line-wrapping.

**Exceptions:**

1. Lines where obeying the column limit is not possible (for example, a long URL in ApexDoc).
2. Command lines in a comment that may be cut-and-pasted into a shell.

### 4.5 - Line-wrapping

**Terminology Note:** When code that might otherwise legally occupy a single line is divided into multiple lines, this activity is called _line-wrapping_.

There is no comprehensive, deterministic formula showing _exactly_ how to line-wrap in every situation. Very often there are several valid ways to line-wrap the same piece of code.

**Note:** While the typical reason for line-wrapping is to avoid overflowing the column limit, even code that would in fact fit within the column limit _may_ be line-wrapped at the author's discretion.

**Tip:** Extracting a method or local variable may solve the problem without the need to line-wrap.

#### 4.5.1 - Where to break

The prime directive of line-wrapping is: prefer to break at a **higher syntactic level**. Also:

1. When a line is broken at a _non-assignment_ operator the break comes _before_ the symbol.
    * This also applies to the following "operator-like" symbol:
        * the dot separator (`.`)
2. When a line is broken at an _assignment_ operator the break typically comes _after_ the symbol, but either way is acceptable.
    * This also applies to the "assignment-operator-like" colon in an enhanced `for` statement.
3. A method or constructor name stays attached to the open parenthesis (`(`) that follows it.
4. A comma (`,`) stays attached to the token that precedes it.

**Note:** The primary goal for line wrapping is to have clear code, _not necessarily_ code that fits in the smallest number of lines.

##### 4.5.1.1 - SOQL and SOSL statements

###### DO

SOQL queries should be formatted for readability.  SOQL statements should adhere to max line length guidelines. If line breaks are required, break on SELECT, FROM, WHERE, ORDER BY, GROUP BY and field names.

Examples:

Line length less than max line length

    List<Account> accountList = [SELECT Id, Name FROM Account WHERE id = :someId];

Line exceeds line length:

Multiple expressions in the select clause

    List<Account> accountListWithNotes = [
        SELECT 
            Id,
            Name,
            LastModifiedDate
        FROM Account
        WHERE LastModifiedDate = LAST_N_MONTHS:6
        ORDER BY Phone ASC
    ];

Multiple filters in where clause

    List<Account> accountListWithNotes = [
        SELECT Id
        FROM Account
        WHERE LastModifiedDate = LAST_N_MONTHS:6
            AND Phone != NULL
            AND (Name IN ('Account1', 'Account2')
                OR BillingState = 'IN')
        ORDER BY Phone ASC
    ];

Or:

    List<Account> accountListWithNotes = [
        SELECT Id, Name, LastModifiedDate, Field2, Field3,
            Field4, FIeld5, Field6
        FROM Account
        WHERE LastModifiedDate = LAST_N_MONTHS:6
        AND Phone != NULL
        AND (Name IN ('Account1', 'Account2')
                OR BillingState = 'IN')
        ORDER BY Phone ASC
    ];

OR:

    List<Account> accountListWithNotes = [
        SELECT Id,
            Name,
            LastModifiedDate,
            BillingCity,
            BillingState,
            BillingCountry,
            Phone
        FROM Account
        WHERE LastModifiedDate = LAST_N_MONTHS:6
        AND Phone != NULL
        AND (Name IN ('Account1', 'Account2')
                OR BillingState = 'IN')
        ORDER BY Phone ASC
    ];

###### Avoid

Avoid adding multiple where clause filters on the same line

    List<Account> accounts = [
        SELECT Id
        FROM Account
        WHERE BillingState = 'MA' AND BillingCity = 'Boston' 
        ORDER BY Phone ASC
    ];

Avoid adding a line break on the IN reserved word

    List<Account> accounts = [
        SELECT Id
        FROM Account
        WHERE LastModifiedDate = LAST_N_MONTHS:6
            AND (Name 
            IN ('Account1', 'Account2') 
            OR BillingState = 'IN')
        ORDER BY Phone ASC
    ];

Avoid breaking on boolean operators in where clause filter

    List<Account> accounts = [
        SELECT Id
        FROM Account
        WHERE LastModifiedDate = LAST_N_MONTHS:6
            AND Name =
                'Tom'
            OR BillingState =
                'IN'
        ORDER BY Phone ASC
    ];

#### 4.5.2 - Indent continuation lines at least +4 spaces

When line-wrapping, each line after the first (each _continuation line_) is indented at least +4 from the original line.

When there are multiple continuation lines, indentation may be varied beyond +4 as desired. In general, two continuation lines use the same indentation level if and only if they begin with syntactically parallel elements.

Section 4.6.3 on Horizontal alignment addresses the discouraged practice of using a variable number of spaces to align certain tokens with previous lines.

##### 4.5.2.1 - SOQL and SOSL indentation

When a SOQL or SOSL statement is line wrapped it uses the standard +4 spaces from the block containing it.

Field names and sub-selects may be indented a further +4 spaces.

Avoid using a variable number of spaces to align with previous lines.

### 4.6 - Whitespace

#### 4.6.1 - Vertical Whitespace

A single blank line appears:

1. _Between_ consecutive members or initializers of a class: fields, constructors, methods, nested classes, static initializers, and instance initializers.
    * **Exception:** A blank line between two consecutive fields (having no other code between them) is optional. Such blank lines are used as needed to create _logical groupings_ of fields.
    * **Exception:** Blank lines between enum constants are covered in Section 4.8.1.
2. Between statements, _as needed_ to organize the code into logical subsections.
3. _Optionally_ before the first member or initializer, or after the last member or initializer of the class (neither encouraged nor discouraged).
4. As required by other sections of this document (such as Section 3, Source file structure).

_Multiple_ consecutive blank lines are permitted, but never required (or encouraged).

#### 4.6.2 - Horizontal whitespace

Beyond where required by the language or other style rules, and apart from literals, comments and ApexDoc, a single ASCII space also appears in the following places **only**.

1. Separating any reserved word, such as `if`, `for` or `catch`, from an open parenthesis (`(`) that follows it on that line
2. Separating any reserved word, such as `else` or `catch`, from a closing curly brace (`}`) that precedes it on that line
3. On both sides of any binary or ternary operator. This also applies to the following "operator-like" symbol:
    * the colon (`:`) in an enhanced `for` statement
But does not apply to:
    * the dot separator (`.`), which is written like `object.toString()`
    * the SOQL local variable reference, which is written like `B = [SELECT Id FROM Account WHERE Id = :A.Id];`.
4. On both sides of the double slash (`//`) that begins an end-of-line comment. Here, multiple spaces are allowed, but not required.
5. Between the type and variable of a declaration: `List<String> list`
6. _Optional_ just inside both braces of an list initializer
    * `new int[] {5, 6}` and `new int[] { 5, 6 }` are both valid

This rule is never interpreted as requiring or forbidding additional space at the start or end of a line; it addresses only _interior_ space.

#### 4.6.3 - Horizontal alignment: never required

**Terminology Note:** _Horizontal alignment_ is the practice of adding a variable number of additional spaces in your code with the goal of making certain tokens appear directly below certain other tokens on previous lines.

This practice is permitted, but is **never required** by NimbleUser Style. It is not even required to _maintain_ horizontal alignment in places where it was already used.

Here is an example without alignment, then using alignment:

    private Integer x; // this is fine
    private String str; // this too

    private Integer   x;      // permitted, but future edits
    private String str;  // may leave it unaligned

**Tip:** Alignment can aid readability, but it creates problems for future maintenance. Consider a future change that needs to touch just one line. This change may leave the formerly-pleasing formatting mangled, and that is **allowed**. More often it prompts the coder (perhaps you) to adjust whitespace on nearby lines as well, possibly triggering a cascading series of reformattings. That one-line change now has a "blast radius." This can at worst result in pointless busywork, but at best it still corrupts version history information, slows down reviewers and exacerbates merge conflicts.

### 4.7 - Grouping parentheses: recommended

Optional grouping parentheses are omitted only when author and reviewer agree that there is no reasonable chance the code will be misinterpreted without them, nor would they have made the code easier to read. It is _not_ reasonable to assume that every reader has the entire Apex operator precedence table memorized.

### 4.8 - Specific constructs

#### 4.8.1 - Enums

After each comma that follows an enum constant, a line break is optional. Additional blank lines (usually just one) are also allowed. This is one possibility:

    private enum Answer {
        YES,

        NO,
        MAYBE
    }

An enum with no documentation on its constants may optionally be formatted as if it were an list initializer (see Section 4.8.3.1 on list initializers).

    private enum Suit { CLUBS, HEARTS, SPADES, DIAMONDS }

#### 4.8.2 - Variable declarations

##### 4.8.2.1 - One variable per declaration

Every variable declaration (field or local) declares only one variable.

##### 4.8.2.2 - Declared when needed

Local variables are **not** habitually declared at the start of their containing block or block-like construct. Instead, local variables are declared close to the point they are first used (within reason), to minimize their scope. Local variable declarations typically have initializers, or are initialized immediately after declaration.

#### 4.8.3 - Lists

##### 4.8.3.1 - List initializers: can be "block-like"

Any list initializer may _optionally_ be formatted as if it were a "block-like construct." For example, the following are all valid (**not** an exhaustive list):

    List<String> example = new List<String> {
        'one', 'two', 'three'
    };

    List<String> example = new List<String> {
        'one',
        'two',
        'three'
    };

#### 4.8.4 - Annotations

[Annotations](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation.htm) applying to a class, method or constructor appear immediately after the documentation block, and on a line of its own. These line breaks do not constitute line-wrapping (Section 4.5, Line-wrapping, so the indentation level is not increased. Example:

    @deprecated
    @testVisible
    private String getNameIfPresent() { ... }

Exception: A single parameterless annotation may instead appear together with the first line of the signature, for example:

    @testSetup static void methodName() {

    }

#### 4.8.5 - Comments

This section addresses _implementation comments_. ApexDoc is addressed separately in Section 7, ApexDoc.

Any line break may be preceded by arbitrary whitespace followed by an implementation comment. Such a comment renders the line non-blank.

##### 4.8.5.1 - Block comment style

Block comments are indented at the same level as the surrounding code. They may be in `/* ... */` style or `// ...` style. For multi-line `/* ... */` comments, subsequent lines must start with `*` aligned with the `*` on the previous line.

    /*
     * This is          // And so           /* Or you can
     * okay.            // is this.          * even do this. */
     */

Comments are not enclosed in boxes drawn with asterisks or other characters.

**Tip:** When writing multi-line comments, use the `/* ... */` style if you want automatic code formatters to re-wrap the lines when necessary (paragraph-style). Most formatters don't re-wrap lines in `// ...` style comment blocks.

#### 4.8.6 - Modifiers

Class and member modifiers, when present, appear in the order recommended by the [Apex Language Specification] (https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_defining.htm):

private, protected, public, global, virtual, abstract, with sharing, without sharing


#### 4.8.6 - Numeric Literals

`Long`-valued integer literals use an uppercase `L` suffix, never lowercase (to avoid confusion with the digit `1`). For example, `3000000000L` rather than `3000000000l`.

## 5 - Naming

### 5.1 - Rules common to all identifiers

Identifiers use only ASCII letters and digits, and, in a small number of cases noted below, underscores. Thus each valid identifier name is matched by the regular expression `\w+` .

The platform reserves use of two consecutive underscores in a name (double underscore). A double underscore cannot be used in a developer name.

In NimbleUser Style special prefixes or suffixes, like those seen in the examples `name_`, `mName`, `s_name` and `kName`, are **not** used.

### 5.2 - Rules by identifier type

#### 5.2.1 - Class names

Class names are written in UpperCamelCase.

Class names are typically nouns or noun phrases. For example, `Character` or `ImmutableList`. Interface names may also be nouns or noun phrases (for example, `List`), but may sometimes be adjectives or adjective phrases instead (for example, `Readable`).

_Test_ classes are named starting with the name of the class they are testing, and ending with `Test`. For example, `HashTest` or `HashIntegrationTest`.

#### 5.2.2 - Method names

Method names are written in lowerCamelCase.

Method names are typically verbs or verb phrases. For example, `sendMessage` or `stop`.

Underscores may appear in unit _test_ method names to separate logical components of the name. One typical pattern is `<MethodUnderTest>_<withState>_<expectation>`, for example `constructor_nullArgument_expectArgumentNullException`. There is no One Correct Way to name test methods.

#### 5.2.3 - Constant names

Constant names use `CONSTANT_CASE`: all uppercase letters, with words separated by underscores. But what _is_ a constant, exactly?

Constants are static final fields whose contents are deeply immutable and whose methods have no detectable side effects. This includes primitives, Strings, immutable types, and immutable collections of immutable types. If any of the instance's observable state can change, it is not a constant. Merely _intending_ to never mutate the object is not enough. Examples:

    // Constants
    public static final int NUMBER = 5;
    public static final List<String> NAMES = new List<String> { 'Ed', 'Ann' };
    public static final Map<String, Integer> AGES =
        new Map<String, Integer> { 'Ed' => 35, 'Ann' => 32};
    public enum SomeEnum { ENUM_CONSTANT };

    // Not constants
    private static String nonFinal = "non-final";
    private final String nonStatic = "non-static";
    private static final Set<String> mutableCollection = new Set<String>();

These names are typically nouns or noun phrases.

#### 5.2.4 - Non-constant field names

Non-constant field names (static or otherwise) are written in lowerCamelCase.

These names are typically nouns or noun phrases. For example, `computedValues` or `index`.

#### 5.2.5 - Parameter names

Parameter names are written in lowerCamelCase.

One-character parameter names should be avoided.

#### 5.2.6 - Local variable names

Local variable names are written in lowerCamelCase.

Even when final and immutable, local variables are not considered to be constants, and should not be styled as constants.

#### 5.2.7 - Property names

Property names are written in UpperCamelCase.

#### 5.2.8 - SOQL and SOSL reserved words

All SOQL and SOSL reserved words are written in all uppercase letters.

### 5.3 - Camel case: defined

Sometimes there is more than one reasonable way to convert an English phrase into camel case, such as when acronyms or unusual constructs like "IPv6" or "iOS" are present. To improve predictability, NimbleUser Style specifies the following (nearly) deterministic scheme.

Beginning with the prose form of the name:

1. Convert the phrase to plain ASCII and remove any apostrophes. For example, "Müller's algorithm" might become "Muellers algorithm".
2. Divide this result into words, splitting on spaces and any remaining punctuation (typically hyphens).
    * _Recommended:_ if any word already has a conventional camel-case appearance in common usage, split this into its constituent parts (e.g., "AdWords" becomes "ad words"). Note that a word such as "iOS" is not really in camel case _per se_; it defies _any_ convention, so this recommendation does not apply.
3. Now lowercase _everything_ (including acronyms), then uppercase only the first character of:
    * ... each word, to yield _upper camel case_, or
    * ... each word except the first, to yield _lower camel case_
4. Finally, join all the words into a single identifier.

Note that the casing of the original words is almost entirely disregarded. Examples:

Prose Form | Correct | Incorrect
--- | --- | ---
"XML HTTP request" | `XmlHttpRequest` | `XMLHTTPRequest`
"new customer ID" | `newCustomerId` | `newCustomerID`
"inner stopwatch" | `innerStopwatch` | `innerStopWatch`
"supports IPv6 on iOS?" | `supportsIpv6OnIos` | `supportsIPv6OnIOS`

**Note:** Some words are ambiguously hyphenated in the English language: for example "nonempty" and "non-empty" are both correct, so the method names `checkNonempty` and `checkNonEmpty` are likewise both correct.

## 6 - Programming Practices

### 6.1 - Caught exceptions: not ignored

It is incorrect to do nothing in response to a caught exception. (Typical responses are to log it.)

## 7 - Comments

### 7.1 - Formatting

#### 7.1.1 - General form

In general, the use of comments are optional and should be minimized by making the code self-documenting through the use of appropriate name choices and an explicit logical structure.  When classes and methods are intended for use as shared APIs, comments are highly recommended.  In these cases comments should be formatted with block style comments.

The _basic_ formatting of [ApexDoc](https://github.com/SalesforceFoundation/ApexDoc) blocks is as seen in this example:

    /**
     * @description A description of the method's functionality would go here.
     * @param fieldName A description of what this parameter is used for.
     * @return A description of what is returned.
     * @throws ArgumentNullException if fieldName is null.
     */
    public Integer method(String fieldName) { ... }

#### 7.1.2 At-clauses

Any of the standard "at-clauses" that are used appear in the order `@description`, `@param`, `@return`, `@throws`. When an at-clause doesn't fit on a single line, continuation lines are indented four (or more) spaces from the position of the `@`.

### 7.2 The summary fragment

Each ApexDoc block begins with a brief **summary fragment**. This fragment is very important: it is the only part of the text that appears in certain contexts such as class and method indexes.

This is a fragment: a noun phrase or verb phrase, not a complete sentence. It does **not** begin with "A {@code Foo} is a...", or "This method returns...", nor does it form a complete imperative sentence like "Save the record.". However, the fragment is capitalized and punctuated as if it were a complete sentence.

**Tip:** A common mistake is to write simple ApexDoc in the form `@return the customer ID`. This is incorrect, and should be changed to `Returns the customer ID.`

### 7.3 - Where ApexDoc is used

At the _minimum_, ApexDoc is present for every `global`, `public` class, and every `global`, `public` or `protected` member of such a class, with a few exceptions noted below.

#### 7.3.1 - Exception: self-explanatory methods

ApexDoc is optional for "simple, obvious" methods like `getFoo`, in cases where there _really and truly_ is nothing else worthwhile to say but "Returns the foo".

**Important:** it is not appropriate to cite this exception to justify omitting relevant information that a typical reader might need to know. For example, for a method named `getCanonicalName`, don't omit its documentation (with the rationale that it would say only `/** @description Returns the canonical name. */`) if a typical reader may have no idea what the term "canonical name" means!

#### 7.3.2 - Exception: overrides

ApexDoc is not always present on a method that overrides a supertype method.

#### 7.3.3 - Non-required ApexDoc

Other classes and members have ApexDoc *as needed or desired*.

Whenever an implementation comment would be used to define the overall purpose or behavior of a class or member, that comment is written as ApexDoc instead (using `/**`).

## 8 - Testing

### 8.1 - Declaration

#### 8.1.1 - Test Classes

Test classes are annotated with `@isTest`. This omits them from code coverage considerations at the time of deployment and packaging. All test classes are `private`.

    @isTest
    private class ExampleTest {
        ...
    }

#### 8.1.2 - Test Methods

Each test is annotated with a simple `@isTest` on the line proceeding the method declaration. This keeps it consistent with the declaration of a test class.

The name of a test method is descriptive as to what method is being tested, what conditions apply to the method under test, what the expected outcome is.

    @isTest
    private static void constructor_nullArgument_expectArgumentNullException() {
        ...
    }

##### 8.1.2.1 - SeeAllData

The `@isTest(SeeAllData=true)` test setting should be avoided unless absolutely necessary. Part of writing safe, high quality tests is to ensure that your test data is unchanging.

This test setting allows your tests to [use live data](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_testing_seealldata_using.htm) in your Salesforce org. Any user could change that data at any time and in turn, cause your test to fail.

##### 8.1.2.2 - Starting and Stopping

In a test method, the `Test.startTest()` and `Test.stopTest()` method calls are to be used to isolate the single operation under test from any test setup code, by [resetting the limits](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_testing_tools_start_stop_test.htm).

    @isTest
    private static void getRecord_withRecordId_expectRecordRetrieved() {
        ExampleController testController = new ExampleController();

        // Inserts an SObject record to use in the execution of the test. Impacts governor limits.
        Id testRecordId = TestDataHelperClass.Instance.insertRecord().Id;

        Test.startTest();
        SObject actualRecord = testController.getRecord(testRecordId);
        Test.stopTest();

        System.assertNotEquals(null, actualRecord, 'Did not expect to retrieve a null record.');
        System.assertEquals(testRecordId, actualRecord.Id, 'Expected to retrieve the test record.');
    }

### 8.2 - Mocking

When possible, utilize mocking functionality. Mocking cuts down on test execution time by decoupling your code from the Salesforce database when running tests which interact with SObject records.

One such way is via the [FinancialForce fflib-apex-common open source project](https://github.com/financialforcedev/fflib-apex-common). This allows for convenient mocking.

#### 8.2.1 - Class Considerations

When utilizing mocking, it is required by the platform to have access to a constructor which is `public` or `global` and contains zero arguments.

If you do not wish to expose a zero argument constructor in a given class, you can declare a `@testVisible`, `protected` constructor.

    public virtual without sharing class Example {
        /**
         * @description A protected constructor solely for mocking purposes.
         */
        @testVisible
        protected Example() { }

        /**
         * @description Constructs an instance of Example with the specified record Id.
         * @param recordId The record Id to use for instantiation.
         * @throws ArgumentNullException if Id is null.
         */
        public Example(Id recordId) {
            ...
        }
    }

#### 8.2.2 - Method Considerations

When restricting code blocks for purposes of mocking, check if the mock instance is `null` prior to checking if `Test.isRunningTest()`.

This lessens the opportunity for any such performance bottlenecks that could occur at runtime during the checking of `Test.isRunningTest()` as it is secondary to the mockking `null` check.

    if (mockInstance != null && Test.isRunningTest()) {
        return mockInstance;
    }

<script src="assets/jquery-3.2.1.min.js"></script>
<script src="assets/toc.js"></script>
