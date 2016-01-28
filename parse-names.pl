#!/usr/bin/perl
use warnings;
use strict;


`g++ -std=c++11 -v -O2 -o getjson getjson.cpp`;
`./getjson`;

my $input;
my $filename = "nodes0.tsv";
my $encoding = ":encoding(UTF-8)";
my @line;
open ($input, "< $encoding", $filename) or die "Nie mozna otworzyc pliku.";


my $output;
my $outname = "nodes.tsv";
open ($output, "> $encoding", $outname) or die "Nie mozna utworzyc pliku";

my $temp;
my $b = <$input>;
my @a;
my $name;
my $wiki;

print $output "name\twiki\tyear\n";

while (<$input>) {
	@a = split '\t';
	$name = $a[0];
	$name =~ s/http:\/\/dbpedia\.org\/resource\///;
	$wiki = $a[0];
	$wiki =~ s/http:\/\/dbpedia\.org\/resource\//https:\/\/en\.wikipedia\.org\/wiki\//;
	$name =~ s/\_/\ /g;
	print $output "$name\t$wiki\t$a[1]";
}


